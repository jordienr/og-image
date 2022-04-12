import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");

const socImg = readFileSync(`${__dirname}/../_img/social_img.jpg`).toString(
  "base64"
);

function getCss() {
  return `
  @font-face {
    font-family: 'Archivo';
    font-style:  normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
  }
    body {
        height: 100vh;
        display: flex;
        align-items: center;
        font-family: "Archivo";
    }
    .heading {
        font-size: 120px;
        margin-top: -32px;
        font-style: normal;
        margin-left: 180px;
        color: #fff;
        text-transform: capitalize;
        font-family: 'Archivo';
    }
    img {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div>
            <img src="data:image/jpg;base64, ${socImg}">
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}
