const applyGaussianFilter = require("./index.cjs");

applyGaussianFilter("./input.jpg", "./output.jpg")
  .then(() => console.log("完了"))
  .catch(console.error);
