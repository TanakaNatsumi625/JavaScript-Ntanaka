// createSRI.js
import { readFileSync } from "fs";
import { createHash } from "crypto";

const data = readFileSync("index.js");
const hash = createHash("sha384").update(data).digest("base64");
console.log("sha384-" + hash);
