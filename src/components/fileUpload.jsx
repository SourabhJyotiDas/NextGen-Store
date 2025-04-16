"use client";
import { IKUpload } from "imagekitio-next";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";

export default function FileUpload({
  setUploadedImageUrl,
  setAvatar,
  setProgress,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="">
      {/* Camera Icon that triggers upload */}
      <label htmlFor="uploadInput">
        <div className="cursor-pointer inline-block bg-gray-100 hover:bg-gray-200 rounded-full ">
          <FiCamera className="text-blue-600" />
        </div>
      </label>

      {/* Hidden IKUpload with matching id */}
      <IKUpload
        id="uploadInput"
        fileName="my-upload"
        useUniqueFileName={true}
        folder="/NextGenStore"
        tags={["nextjs", "imagekit", "upload"]}
        customCoordinates="10,10,100,100"
        isPrivateFile={false}
        className="hidden"
        onUploadStart={() => {
          setUploading(true);
          setProgress(0);
          setError(null);
        }}
        onUploadProgress={(event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        }}
        onSuccess={(res) => {
          setUploadedImageUrl(res?.url);
          setAvatar(res?.url);
          setUploading(false);
        }}
        onError={(err) => {
          console.error("Upload Error:", err);
          setError(err?.message || "Upload failed");
          setUploading(false);
        }}
      />

      {error && <div className="mt-2 text-red-500 font-semibold">{error}</div>}
    </div>
  );
}
