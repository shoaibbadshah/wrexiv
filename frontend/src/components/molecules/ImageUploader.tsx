"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

type PropsType = {
  handleUploaded: (url: string) => void;
};

const ImageUploader = ({ handleUploaded }: PropsType) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
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
          setImgUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (imgUrl) {
      handleUploaded(imgUrl);
    }
  }, [imgUrl]);

  return (
    <div>
      <input type="file" onChange={handleSubmit} />
      {imgUrl && (
        <div style={{ height: 200, maxHeight: 200 }}>
          <img
            src={imgUrl}
            alt="uploaded file"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
