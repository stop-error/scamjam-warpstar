// The same code is in worker.js
// Cloudflare Worker script for URL rewriting

export default {
  // Main fetch handler that processes all incoming requests
  async fetch(request, env) {
    // Parse the incoming request URL to extract pathname and other components
    const url = new URL(request.url);

    // Regular expression to match URLs in the pattern: warpstar.scamjam.app/v5/
    const matchHashListsBatchGet = url.pathname.match(/^\/v5\/hashLists:batchGet\?key=INSERT_YOUR_API_KEY_HERE$/);
    const matchHashListsList = url.pathname.match(/^\/v5\/hashLists:list\?key=INSERT_YOUR_API_KEY_HERE$/);
    const matchHashsListGet = url.pathname.match(/^\/v5\/hashList:get\?key=INSERT_YOUR_API_KEY_HERE$/);
    const matchHashesSearch = url.pathname.match(/^\/v5\/hashes:search\?key=INSERT_YOUR_API_KEY_HERE$/);



    // If the URL matches our target pattern
    if (matchHashListsBatchGet || matchHashListsList || matchHashsListGet || matchHashesSearch) {

      let newUrlString = request.url.search.replace("INSERT_YOUR_API_KEY_HERE", env.DEV_safe-browsing-api-key);
      newUrlString = newUrlString.replace("warpstar.scamjam.app", "safebrowsing.googleapis.com");

      // Create a new request with the rewritten URL, preserving all original request properties
      const newRequest = new Request(newUrlString, request);

      // Fetch and return the response from the rewritten URL
      return fetch(newRequest);
    }

    // For all other URLs that don't match our pattern, pass through unchanged
    // This ensures the worker doesn't interfere with other site functionality
    return new Response("Access is forbidden", {
      status : 403,
      statusText : "Access is forbidden"
    });
  },
};