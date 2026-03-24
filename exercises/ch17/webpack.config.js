import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./ex05/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "ex05/dist")
  },
  mode: "development",

  devtool: 'source-map',

  devServer: {
    static: [
      {directory: path.resolve(__dirname, "ex05/dist")},
      {directory: path.resolve(__dirname, "ex05")}
    ],
    port: 8080,
    open: true
  }
};