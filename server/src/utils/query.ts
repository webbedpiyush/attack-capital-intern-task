import { PrismaClient } from "@prisma/client";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function registerUser(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with thsi email");
  }

  const passwordHash = await bcrpyt.hash(password, 10);
  return await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });
}

export async function loginUser(
  email: string,
  password: string,
  secret: string
) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not Found");
  }

  const isPasswordValid = await bcrpyt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "24h" });

  return { token, user };
}

export async function createPost(
  title: string,
  content: string,
  authorId: number
) {
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
}

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: {
      author: true,
    },
  });
}

export async function getPostsByAuthor(userId: number) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
    },
  });
}
