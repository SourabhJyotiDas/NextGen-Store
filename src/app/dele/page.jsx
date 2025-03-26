"use client";
import axios from "axios";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file || !email)
      return alert("Please select a file and enter your email");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const { data } = await axios.post(
        "/api/user/profilepicture/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
