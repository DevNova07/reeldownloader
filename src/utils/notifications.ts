/**
 * Utility to handle PWA Notifications
 */

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export async function sendDownloadCompleteNotification() {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const title = 'SavClip';
  const options: any = {
    body: 'Your video is ready! 🎬',
    icon: '/icon-192x192.webp', // Main app icon
    badge: '/icon-192x192.webp',
    vibrate: [100, 50, 100],
    data: {
       url: window.location.origin + '/history' // Redirect to history on click
    }
  };

  // Try to use Service Worker registration for better background handling
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    if (registration) {
      registration.showNotification(title, options);
      return;
    }
  }

  // Fallback to basic notification if SW not available
  new Notification(title, options);
}
