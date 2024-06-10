const PORT: number = +(process.env.PORT || 8087);
// import { generate, removeData, previewData } from "./controllers/generate";
import { apiQRCode } from "./controllers/qrcode";
import { apiHelloWorld } from "./controllers/helloworld";
import { apiGraphics } from "./controllers/graphics";
import { apiGenerate } from "./controllers/generate";



Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let response;
    switch (url.pathname) {
      case "/api/helloworld":
        if (req.method === "GET") {
          response = apiHelloWorld(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/qrcode":
        if (req.method === "GET") {
          response = apiQRCode(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/graphics":
        if (req.method === "GET") {
          response = apiGraphics(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/generate":
        if (req.method === "GET") {
          response = apiGenerate(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      default:
        response = new Response("Not Found", { status: 404 });
        break;
    }
    return response;
  },
  error(error) {
    let response = new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html"
      },
    });
    return response;
  },
});
