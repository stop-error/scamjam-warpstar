// The same code is in worker.js
// Cloudflare Worker script for URL rewriting

export default {
  // Main fetch handler that processes all incoming requests
  async fetch(request, env) {
    // Parse the incoming request URL to extract pathname and other components
    const url = new URL(request.url);

    // Regular expression to match URLs in the pattern: */v5/
    const match = url.pathname.match(/^\/v5\/$/);

    // If the URL matches our target pattern
    if (match) {

      let newUrlString = request.url.search.replace("FAKE_API_KEY", env.DEV_safe-browsing-api-key);
      newUrlString = newUrlString.replace("warpstar.scamjam.app", "safebrowsing.googleapis.com");

      // Create a new request with the rewritten URL, preserving all original request properties
      const newRequest = new Request(newUrlString, request);

      // Fetch and return the response from the rewritten URL
      return fetch(newRequest);
    }

    // For all other URLs that don't match our pattern, pass through unchanged
    // This ensures the worker doesn't interfere with other site functionality
    return new Response("Poyo! (Access is forbidden)", {
      status : 403,
      statusText : "Poyo! (Access is forbidden)"
    });
  },
};