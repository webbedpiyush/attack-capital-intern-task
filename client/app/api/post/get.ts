import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.BACKEND_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { author } = req.query;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorizeed",
    });
  }

  try {
    const response = await fetch(
      `${API_URL}/posts${author ? `?author=${author}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch posts");
    }
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
