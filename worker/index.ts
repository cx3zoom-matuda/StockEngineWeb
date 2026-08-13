const SUBPATH = "/stockengine";

export default {
  async fetch(request: Request, env: { ASSETS: { fetch(request: Request): Promise<Response> } }) {
    const url = new URL(request.url);

    if (url.pathname === SUBPATH || url.pathname.startsWith(`${SUBPATH}/`)) {
      url.pathname = url.pathname.slice(SUBPATH.length) || "/";
    }

    const assetRequest = new Request(url, request);
    const assetResponse = await env.ASSETS.fetch(assetRequest);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    const accept = request.headers.get("Accept") ?? "";
    const isHtmlNavigation =
      request.method === "GET" &&
      accept.includes("text/html") &&
      !/\.[^/]+$/.test(url.pathname);

    if (!isHtmlNavigation) {
      return assetResponse;
    }

    const indexUrl = new URL(url);
    indexUrl.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
