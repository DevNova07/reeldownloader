import { fetchWithRotation, resolveUrl } from "../api-utils";
import { type PlatformResult, type Media } from "../../types/download";

export async function snapchatHandler(url: string): Promise<PlatformResult> {
  const resolvedUrl = await resolveUrl(url);

  // 1. If it's a specific spotlight link
  if (resolvedUrl.includes("/spotlight/") || resolvedUrl.includes("/p/")) {
    const apiUrl = `https://snapchat3.p.rapidapi.com/getSpotlightByLink?spotlight_link=${encodeURIComponent(resolvedUrl)}`;
    
    const response = await fetchWithRotation(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "snapchat3.p.rapidapi.com",
      },
    }, "snapchat");

    const result = await response.json();

    if (!result || !result.success || !result.data || !result.data.metadata || !result.data.metadata.videoMetadata) {
      throw new Error("Failed to fetch Snapchat Spotlight video. Make sure the link is correct.");
    }

    const videoData = result.data.metadata.videoMetadata;
    const author = videoData.creator?.personCreator?.username || "Snapchat User";
    const authorName = videoData.creator?.personCreator?.name || author;

    const medias: Media[] = [];
    if (videoData.contentUrl) {
      medias.push({
        id: `snapchat-spotlight-${author}`,
        url: videoData.contentUrl,
        quality: "Spotlight Video",
        type: "video",
        extension: "mp4"
      });
    }

    if (medias.length === 0) {
      throw new Error("No media found for this Spotlight link.");
    }

    return {
      title: videoData.name || "Snapchat Spotlight",
      caption: videoData.description || "",
      thumbnail: videoData.thumbnailUrl || "",
      medias,
      author: authorName,
      authorId: author,
      likes: parseInt(result.data.metadata.engagementStats?.recommendCount || "0", 10),
      commentCount: parseInt(result.data.metadata.engagementStats?.commentCount || "0", 10),
      shareCount: parseInt(result.data.metadata.engagementStats?.shareCount || "0", 10),
    };
  }
  
  // 2. Profile / User Logic
  let username = "";
  const match = resolvedUrl.match(/@([a-zA-Z0-9_.-]+)/) || resolvedUrl.match(/\/add\/([a-zA-Z0-9_.-]+)/);
  if (match && match[1]) {
    username = match[1];
  } else {
    // Fallback: If there are no slashes, treat the whole string as a username
    if (!resolvedUrl.includes("/")) {
      username = resolvedUrl;
    } else {
      throw new Error("Could not extract Snapchat username from URL.");
    }
  }

  const storiesUrl = `https://snapchat-scraper2.p.rapidapi.com/api/v1/users/stories?username=${encodeURIComponent(username)}`;
  const profileUrl = `https://snapchat3.p.rapidapi.com/getFullProfile?username=${encodeURIComponent(username)}`;

  // Fetch both APIs concurrently
  const [storiesResponse, profileResponse] = await Promise.allSettled([
    fetchWithRotation(storiesUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": "snapchat-scraper2.p.rapidapi.com" },
    }, "snapchat"),
    fetchWithRotation(profileUrl, {
      method: "GET",
      headers: { "x-rapidapi-host": "snapchat3.p.rapidapi.com" },
    }, "snapchat")
  ]);

  const medias: Media[] = [];
  let title = username;
  let caption = "Snapchat Profile & Stories";
  let thumbnail = "";
  let likes = 0;

  // Process Profile Data (snapchat3)
  if (profileResponse.status === "fulfilled") {
    try {
      const profileResult = await profileResponse.value.json();
      if (profileResult && profileResult.success && profileResult.data && profileResult.data.profile) {
        const profile = profileResult.data.profile.info;
        const metadata = profileResult.data.profile.metadata;
        
        if (profile) {
          title = profile.title || username;
          caption = metadata?.pageDescription?.value || profile.bio || caption;
          thumbnail = profile.profilePictureUrl || "";
          likes = parseInt(profile.subscriberCount || "0", 10);
          
          if (profile.profilePictureUrl) {
            medias.push({
              id: `snapchat-profile-${username}`,
              url: profile.profilePictureUrl,
              quality: "Profile Picture",
              type: "image",
              extension: "jpg"
            });
          }
          if (profile.snapcodeImageUrl) {
            medias.push({
              id: `snapchat-snapcode-${username}`,
              url: profile.snapcodeImageUrl,
              quality: "Snapcode",
              type: "image",
              extension: "svg"
            });
          }
        }

        // Spotlight Highlights from profile
        if (profileResult.data.spotlightHighlights && Array.isArray(profileResult.data.spotlightHighlights)) {
          profileResult.data.spotlightHighlights.forEach((highlight: any, hIdx: number) => {
            if (highlight.snapList && Array.isArray(highlight.snapList)) {
              highlight.snapList.forEach((snap: any, sIdx: number) => {
                if (snap.snapUrls && snap.snapUrls.mediaUrl) {
                  medias.push({
                    id: `snapchat-spotlight-${hIdx}-${sIdx}`,
                    url: snap.snapUrls.mediaUrl,
                    quality: "Spotlight Video",
                    type: "video",
                    extension: "mp4"
                  });
                }
              });
            }
          });
        }
      }
    } catch (e) {
      console.error("[Snapchat] Profile parsing error", e);
    }
  }

  // Process Stories Data (snapchat-scraper2)
  if (storiesResponse.status === "fulfilled") {
    try {
      const storiesResult = await storiesResponse.value.json();
      if (storiesResult && storiesResult.status === "ok" && storiesResult.data && storiesResult.data.stories) {
        const stories = storiesResult.data.stories;
        stories.forEach((story: any, storyIdx: number) => {
          if (story.snapList && Array.isArray(story.snapList)) {
            story.snapList.forEach((snap: any, snapIdx: number) => {
              if (snap.snapUrls && snap.snapUrls.mediaUrl) {
                medias.push({
                  id: `snapchat-story-${storyIdx}-${snapIdx}`,
                  url: snap.snapUrls.mediaUrl,
                  quality: "Story Video",
                  type: "video",
                  extension: "mp4"
                });
              }
            });
          }
        });

        // Use story thumbnail if profile didn't provide one
        if (!thumbnail && stories.length > 0 && stories[0].thumbnailUrl) {
          thumbnail = stories[0].thumbnailUrl.value || "";
        }
      }
    } catch (e) {
      console.error("[Snapchat] Stories parsing error", e);
    }
  }

  if (medias.length === 0) {
    throw new Error("No media found for this Snapchat user or the user does not exist.");
  }

  return {
    title,
    caption,
    thumbnail,
    medias,
    author: title,
    authorId: username,
    likes,
    commentCount: 0,
    shareCount: 0,
  };
}
