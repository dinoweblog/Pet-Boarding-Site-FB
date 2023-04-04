const app = require("./index");
const connect = require("./configs/db");

const port = process.env.PORT || 8000;

app.listen(port, async function () {
  try {
    await connect();
    console.log(`listening on port ${port}`);
  } catch (err) {
    console.log(err);
  }
});
