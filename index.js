import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

import toolsRouter from "./routes/tools.js";

app.use("/tools", toolsRouter);

app.listen(3000, () => {
  console.log("AI tools backend running on port 3000");
});

