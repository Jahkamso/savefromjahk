"use client"

import React, { useEffect, useState } from "react";

export default function InputField() {
  // State to store the input value (YouTube URL) and downloading status
  const [inputValue, setInputValue] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [videoDownloaded, setVideoDownloaded] = useState(false)

  useEffect(() => {
    if(videoDownloaded) alert("Video downloaded")
  }, [videoDownloaded])

  // Function to handle changes in the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      downloadVideo();
    }
  };

  // Function to handle the download process
  const downloadVideo = async () => {
    setDownloading(true); // Set downloading status to true to disable input and button
    try {
      // Make a POST request to the API endpoint to start the download process
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputValue }), // Send the YouTube URL to the backend in json format
      });
      const data = await response.json(); // Parse the response from the backend

      if (response.ok) {
        // If the response is OK, create a temporary link element
        const link = document.createElement("a");
        link.href = data.videoPath; // Set the href to the video path returned by the backend
        link.setAttribute("download", ""); // Set the download attribute to prompt a download
        document.body.appendChild(link); // Add the link to the document
        link.click(); // Programmatically click the link to start the download
        link.remove(); // Remove the link from the document
        setVideoDownloaded(true)
      } else {
        console.error(data.error); // Log any errors returned by the backend
      }
    } catch (error) {
      console.error("An error occurred:", error); // Log any errors that occur during the fetch
    } finally {
      setDownloading(false); // Set downloading status to false to re-enable input and button
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {/* Input field to enter the YouTube URL */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="bg-transparent border border-emerald-500 text-slate-300 outline-none rounded-md py-1 px-2"
          placeholder="Enter YouTube URL"
          disabled={downloading} // Disable input while downloading
        />
        {/* Download button */}
        <button
          className={`bg-emerald-600 px-3 rounded-md ${
            downloading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={downloadVideo}
          disabled={downloading} // Disable button while downloading
        >
          {downloading ? "Downloading..." : "Download"}{" "}
          {/* Button text changes based on downloading status */}
        </button>
      </div>
    </div>
  );
}



