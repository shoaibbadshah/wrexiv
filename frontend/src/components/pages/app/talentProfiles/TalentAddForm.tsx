import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCreateDocumentsMutation } from "@/graphql/generated";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { MultipleFileUploader } from "@/components/molecules/MultipleFileUploader";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

type Message = {
  status: "success" | "error" | "loading";
  content: string;
};

export default function TalentAddForm({ open, handleClose }: PropsType) {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<Message | null>(null);
  const [createDocuments, {}] = useCreateDocumentsMutation();

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

    const uploadTasks = [];
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(
        storage,
        `talent_document_import/${Date.now()}-${files[i].name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, files[i]);
      uploadTasks.push(uploadTask);
    }
    const res = await Promise.all(uploadTasks);
    const downloadUrlPromises = res.map(snapshot =>
      getDownloadURL(snapshot.ref)
    );

    const downloadUrls = await Promise.all(downloadUrlPromises);

    const fileNameAndURLs = files.map((file, index) => ({
      name: file.name,
      url: downloadUrls[index],
    }));

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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => handleClose()}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden bg-gray-500 bg-opacity-10 transition-opacity">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 mt-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              New Talent
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Get started by uploading files below to add new
                              talent.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="relative text-gray-400 hover:text-gray-500"
                              onClick={() => handleClose()}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
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
                        <MultipleFileUploader
                          setFiles={setFiles}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          maxFileSizeMB={10}
                        />
                      </div>

                      {files.length > 0 && (
                        <div className="mb-4 text-sm text-gray-600 px-6">
                          <strong className="block mb-2">
                            Uploaded files:
                          </strong>
                          <ul className="space-y-2">
                            {files.map((file, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-100 rounded"
                              >
                                <span>{file.name}</span>
                                <button
                                  className="text-red-600 hover:text-red-800 transition"
                                  onClick={event =>
                                    handleRemoveFile(event, index)
                                  }
                                >
                                  <XMarkIcon
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
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
                          onClick={() => handleClose()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={
                            files.length === 0 || message?.status === "loading"
                          }
                          className={`inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                          onClick={handleSubmitFile}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
