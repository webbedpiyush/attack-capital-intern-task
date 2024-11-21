import express from "express";
import jwt from "jsonwebtoken";
import { createPost, getAllPosts, getPostsByAuthor } from "../utils/query";

const postRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  jwt.verify(token, JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
    req.user = user;
    next();
  });
}

postRouter.post("/post", authenticateToken, async (req: any, res: any) => {
  const { title, content } = req.body;

  try {
    const post = await createPost(title, content, req.user.userId);
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

postRouter.get("/posts", async (req: any, res: any) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

postRouter.get("/posts", authenticateToken, async (req: any, res: any) => {
  const { author } = req.query;

  try {
    if (author) {
      const posts = await getPostsByAuthor(Number(author));
      return res.status(200).json(posts);
    }

    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default postRouter;
