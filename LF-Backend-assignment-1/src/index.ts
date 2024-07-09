import express from "express";
import config from "./config";
import routers from "./routes/index.routes";

const app = express();
app.use(express.json());
app.use(routers);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
