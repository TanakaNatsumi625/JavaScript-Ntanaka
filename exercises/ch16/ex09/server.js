
const app = require('./index.js');
const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
