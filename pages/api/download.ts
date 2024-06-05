import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "youtube-dl-exec";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique video names
import fs from "fs"; // Import fs to handle file system operations

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the video URL from the request body
  const { url } = req.body;

  // Check if the URL is provided
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Generate a unique name for the downloaded video
    const uniqueVideoName = `${uuidv4()}.mp4`;

    // Determine the path to store the video temporarily on the server
    const videoPath = path.resolve("./public/videos", uniqueVideoName);

    // Create the directory if it doesn't exist
    if (!fs.existsSync("./public/videos")) {
      fs.mkdirSync("./public/videos", { recursive: true });
    }

    // Download the video using youtube-dl-exec
    await exec(url, {
      output: videoPath,
      format: "best",
    });

    // Respond with the success message and the video download link
    res.status(200).json({
      message: "Video downloaded",
      videoPath: `/videos/${uniqueVideoName}`, // Provide the download link for the video
    });
  } catch (error: any) {
    // Handle errors during the video download
    res
      .status(500)
      .json({ error: "Failed to download video", details: error.message });
  }
}
 
// trying to test push again