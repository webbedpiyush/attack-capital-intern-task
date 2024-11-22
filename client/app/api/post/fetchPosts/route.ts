import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    
    if (!API_URL) {
      throw new Error("Backend API URL is not configured");
    }

    
    const searchParams = request.nextUrl.searchParams;
    const author = searchParams.get("author");

    // Validate author parameter
    if (!author) {
      return NextResponse.json(
        { error: "Author parameter is required" },
        { status: 400 }
      );
    }

    // Get the token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Invalid authorization header" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    // Construct the URL properly with URLSearchParams
    const urlParams = new URLSearchParams({ author });
    const url = `${API_URL}/posts?${urlParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    // Handle different status codes appropriately
    if (!response.ok) {
      const status = response.status;
      const message = data.error || "Failed to fetch posts";
      
      // Map common status codes
      switch (status) {
        case 401:
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        case 403:
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        case 404:
          return NextResponse.json({ error: "Posts not found" }, { status: 404 });
        default:
          return NextResponse.json({ error: message }, { status });
      }
    }

    // Cache successful responses for 1 minute
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
      },
    });

  } catch (error) {
    // Type guard for Error objects
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    // Handle unknown errors
    console.error("Unknown API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}