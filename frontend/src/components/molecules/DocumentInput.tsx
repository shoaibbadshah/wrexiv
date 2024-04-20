import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { PlusIcon } from "@heroicons/react/20/solid";

type PropsType = {
  handleUploaded: (url: string) => void;
};

const DocumentInput = ({ handleUploaded }: PropsType) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(undefined);
  const [progresspercent, setProgresspercent] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }, [uploadedUrl, handleUploaded]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleSubmit}
        className="hidden"
        accept=".pdf"
      />
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          Document is not Uploaded
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Document can be uploaded to the AI for content-based responses.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClick}
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Upload Document
          </button>
        </div>
      </div>
      {progresspercent > 0 && (
        <progress
          className="progress w-56 my-2"
          value={progresspercent}
          max="100"
        ></progress>
      )}
    </div>
  );
};

export default DocumentInput;
