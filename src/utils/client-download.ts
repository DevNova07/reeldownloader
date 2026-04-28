/**
 * Client-Side Download Utility
 * Aims to save server bandwidth by downloading directly in the browser when possible.
 */

export async function downloadFile(url: string, filename: string, onProgress?: (progress: number) => void): Promise<boolean> {
  try {
    // 1. Try direct client-side fetch (Zero server bandwidth)
    // This works if the media server has CORS enabled
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) throw new Error("Direct fetch failed");

    const contentLength = response.headers.get('content-length');
    const total = contentLength ? parseInt(contentLength, 10) : 0;
    let loaded = 0;

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Reader not available");

    const chunks: Uint8Array[] = [];
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      chunks.push(value);
      loaded += value.length;
      
      if (total && onProgress) {
        onProgress((loaded / total) * 100);
      }
    }

    const blob = new Blob(chunks as any);
    const blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    return true;

  } catch (error) {
    console.warn("Client-side direct download failed (likely CORS), falling back to server proxy.", error);
    return false;
  }
}
