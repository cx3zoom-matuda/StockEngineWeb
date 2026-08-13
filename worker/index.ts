const SUBPATH = "/stockengine";

export default {
  async fetch(request: Request, env: { ASSETS: { fetch(request: Request): Promise<Response> } }) {
    const url = new URL(request.url);

    if (url.pathname === SUBPATH || url.pathname.startsWith(`${SUBPATH}/`)) {
      url.pathname = url.pathname.slice(SUBPATH.length) || "/";
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
