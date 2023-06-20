import http from "http";
import fs from "fs";

//This code creates a simple HTTP server using Node.js http module
const server = http.createServer((req, res) => {
  const superHero = {
    firstName: "Spider",
    lastName: "Monkey",
  };
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Server Working");
  res.write(JSON.stringify(superHero)); //if we want to send a object as a json response then we have to convert it to a json string
  let html = fs.readFileSync("./server.html", "utf-8");
  html = html.replace("{{name}}", "Avijit");
  res.end(html);
});

server.listen(3000, () => {
  console.log("Server is listening in port 3000");
});

// Here are some common content types that can be used in an HTTP response:

// text/plain: Plain text content.
// text/html: HTML content.
// text/css: Cascading Style Sheets (CSS) content.
// text/javascript: JavaScript code.
// application/json: JSON (JavaScript Object Notation) data.
// application/xml: XML (eXtensible Markup Language) data.
// application/pdf: Portable Document Format (PDF) file.
// image/jpeg: JPEG image.
// image/png: PNG image.
// image/gif: GIF image.
// audio/mpeg: MPEG audio file.
// video/mp4: MP4 video file.
// application/octet-stream: Binary data.
// application/x-www-form-urlencoded: Form data encoded in the URL.
// multipart/form-data: Form data with file uploads.
