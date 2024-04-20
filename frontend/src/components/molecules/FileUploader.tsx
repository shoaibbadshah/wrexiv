"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

type PropsType = {
  handleUploaded: (url: string) => void;
};

const FileUploader = ({ handleUploaded }: PropsType) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(undefined);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : undefined;
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      error => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setUploadedUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (uploadedUrl) {
      console.log(uploadedUrl);
      handleUploaded(uploadedUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedUrl]);

  console.log(uploadedUrl);

  return (
    <div>
      <input
        type="file"
        onChange={handleSubmit}
        className="file-input w-full max-w-xs"
        accept=".pdf"
      />
      {uploadedUrl && false && (
        <div>
          <a href={uploadedUrl} target="_blank" rel="noreferrer">
            {uploadedUrl}
          </a>
        </div>
      )}
      {progresspercent > 0 && (
        <progress
          className="progress w-56"
          value={progresspercent}
          max="100"
        ></progress>
      )}
    </div>
  );
};

export default FileUploader;
