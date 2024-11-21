import express from "express";
import cors from "cors";

import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
