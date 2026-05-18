export async function getToolSeoData(toolName: string, locale: string) {
  try {
    return await import(`@/data/seo/${locale}/${toolName}`);
  } catch (error) {
    // Fallback to English if the specific locale file doesn't exist
    return await import(`@/data/seo/en/${toolName}`);
  }
}
