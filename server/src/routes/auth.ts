import express from "express";
import { loginUser, registerUser } from "../utils/query";

const authRouter = express.Router();

authRouter.post("/signup", async (req: any, res: any) => {
  const { email, password } = req.body;


  try {
    const user = await registerUser(email, password);
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(email)

  try {
    const result = await loginUser(email, password, process.env.JWT_SECRET!);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default authRouter;
