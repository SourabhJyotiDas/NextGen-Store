"use client";
import { IKUpload } from "imagekitio-next";
import { useState } from "react";

export default function FileUpload() {
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  return (
    <div className="p-4 mx-auto bg-white shadow-md rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="bg-blue-500">
        <IKUpload
          fileName="my-upload"
          useUniqueFileName={true}
          folder="/INSTAVIBE"
          tags={["nextjs", "imagekit", "upload"]}
          customCoordinates="10,10,100,100"
          isPrivateFile={false}
          className="w-full h-12 sm:h-14 md:h-16 cursor-pointer border border-dashed border-green-500 rounded p-3 hover:bg-gray-50 transition duration-200 text-white text-sm font-medium flex items-center justify-center text-center"

          onUploadStart={() => {
            console.log("onUploadStart");
            setUploading(true);
            setProgress(0);
            setError(null);
          }}

          onUploadProgress={(event) => {
            console.log("onUploadProgress");
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setProgress(percent);
            }
          }}

          onSuccess={(res) => {
            console.log("DATA COMES LIKE THIS", res);
            setUrl(res.url);
            setUploading(false);
          }}

          

          onError={(err) => {
            console.error("Upload Error:", err);
            setError(err?.message || "Upload failed");
            setUploading(false);
          }}
        />
      </div>

      {uploading && (
        <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
          <span>Uploading... {progress}%</span>
        </div>
      )}

      {error && <div className="mt-2 text-red-500 font-semibold">{error}</div>}

      {url && (
        <div className="mt-4">
          <p className="mb-1">Uploaded Image:</p>
          <img
            src={url}
            alt="Uploaded"
            className="w-full max-w-[300px] h-auto rounded border"
          />
        </div>
      )}
    </div>
  );
}
