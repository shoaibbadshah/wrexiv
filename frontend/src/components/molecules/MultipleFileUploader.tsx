"use client";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useState,
} from "react";

type MultipleFileUploaderProps = {
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const MultipleFileUploader = ({
  setFiles,
}: MultipleFileUploaderProps) => {
  const [fileEnter, setFileEnter] = useState(false);

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    const files: File[] = [];
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          let file = e.dataTransfer.items[i].getAsFile();
          if (file) files.push(file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        files.push(e.dataTransfer.files[i]);
      }
    }
    setFiles(prev => [...prev, ...files]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: File[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      setFiles(prev => [...prev, ...files]);
    }
  };

  return (
    <div className="container px-4 max-w-5xl mx-auto">
      <div
        onDrag={e => {
          e.stopPropagation();
        }}
        onDragOver={e => {
          e.preventDefault();
          e.stopPropagation();
          setFileEnter(true);
        }}
        onDragLeave={e => {
          e.preventDefault();
          e.stopPropagation();
          setFileEnter(false);
        }}
        onDragEnd={e => {
          e.preventDefault();
          e.stopPropagation();
          setFileEnter(false);
        }}
        onDrop={handleFileDrop}
        className={`${
          fileEnter ? "bg-gray-100" : ""
        } mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10`}
      >
        <div className="text-center pointer-events-none">
          <DocumentPlusIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
            <label
              htmlFor="file-upload"
              className="pointer-events-auto relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PDF, DOC, DOCX up to 10MB
          </p>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};
