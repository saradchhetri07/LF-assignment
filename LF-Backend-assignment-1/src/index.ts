import express from "express";
import config from "./config";
import routers from "./routes/index.routes";

const app = express();
app.use(express.json());
app.use(routers);

/**
 * Base route goes here
 */
app.get("/", (req, res) => {
  res.send("TODO CRUD");
});

/** *
 * start the server
 */
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
