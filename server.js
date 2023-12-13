import "dotenv/config";
import app from "./src/app.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on locahost:${PORT}`);
});
