"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useCreateDocumentsMutation } from "@/graphql/generated";
import Link from "next/link";

type Message = {
  status: "success" | "error" | "loading";
  content: string;
};

type FileNameAndURL = {
  name: string;
  url: string;
};

const AppTopPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<Message | null>(null);
  const [createDocuments, {}] = useCreateDocumentsMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setMessage(null);

    setFiles(prev => [...prev, ...files]);
    event.target.value = "";
  };

  const handleRemoveFile = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitFile = async () => {
    setMessage({
      status: "loading",
      content: "Uploading files...",
    });

    const fileNameAndURLs: FileNameAndURL[] = [];
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(
        storage,
        `talent_document_import/${Date.now()}-${files[i].name}`
      );
      await uploadBytesResumable(storageRef, files[i])
        .then(snapshot => {
          getDownloadURL(snapshot.ref).then(downloadURL => {
            fileNameAndURLs.push({ name: files[i].name, url: downloadURL });
          });
        })
        .catch(error => {
          setMessage({
            status: "error",
            content: "Failed to upload files",
          });
          return;
        });
    }
    setMessage({
      status: "loading",
      content: "Processing files...",
    });
    createDocuments({
      variables: {
        input: {
          documents: fileNameAndURLs,
        },
      },
    })
      .then(() => {
        setMessage({
          status: "success",
          content: "Files uploaded successfully",
        });
        setFiles([]);
      })
      .catch(() => {
        setMessage({
          status: "error",
          content: "Failed to process files",
        });
      });
  };

  return (
    <div className="m-4">
      <form className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between space-x-3">
              <div className="space-y-1">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  New Talent
                </h2>
                <p className="text-sm text-gray-500">
                  Get started by uploading files below to add new talent.
                </p>
              </div>
              <Link href="/app/file_statuses">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View uploaded files
                </button>
              </Link>
            </div>
          </div>

          {/* Main */}
          <div className="px-4 py-6 sm:px-6">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Talent Files
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <DocumentPlusIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mb-4 text-sm text-gray-600 px-6">
              <strong className="block mb-2">Uploaded files:</strong>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded"
                  >
                    <span>{file.name}</span>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={event => handleRemoveFile(event, index)}
                    >
                      <XMarkIcon className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-row justify-between">
          <div className="flex items-center max-w-[60%] sm:max-w-[75%] md:max-w-[80%] overflow-hidden">
            <div className="text-sm font-semibold ">
              {message && (
                <span
                  className={`${(() => {
                    switch (message.status) {
                      case "success":
                        return "text-green-600";
                      case "error":
                        return "text-red-600";
                      case "loading":
                        return "text-yellow-600";
                    }
                  })()}`}
                >
                  {message.content}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => {}}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={files.length === 0 || message?.status === "loading"}
              className={`inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${files.length === 0 || message?.status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleSubmitFile}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppTopPage;
