import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/solid'

import Image from 'next/image'

type PropsType = {
    open: boolean;
    handleOpen: (open: boolean) => void;
}

export default function TalentAddForm({
    open,
    handleOpen,
}: PropsType) {
    const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        // Add all new file names to the existing list
        const newFileNames = files.map((file) => file.name);

        setUploadedFileNames((prev) => [...prev, ...newFileNames]);

        // Clear the file input to allow re-uploading
        event.target.value = ''; // This allows multiple uploads with different files each time
    };

    const handleRemoveFile = (index: number) => {
        // Remove the file at the specified index from the list
        setUploadedFileNames((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => handleOpen(false)}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
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
                                                            Get started by uploading files below to add new talent.
                                                        </p>
                                                    </div>
                                                    <div className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative text-gray-400 hover:text-gray-500"
                                                            onClick={() => handleOpen(false)}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Main */}
                                            <div className='px-4 py-6 sm:px-6'>
                                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Talent Files
                                                </label>
                                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                    <div className="text-center">
                                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>Drag or drop files</span>
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
                                                        <p className="text-xs leading-5 text-gray-600">PDF, DOC, DOCX up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {uploadedFileNames.length > 0 && (
                                            <div className="mt-4 text-sm text-gray-600">
                                                <strong>Uploaded files:</strong>
                                                <ul>
                                                    {uploadedFileNames.map((name, index) => (
                                                        <li key={index} className="flex items-center justify-between">
                                                            {name}
                                                            <button
                                                                className="text-red-600 hover:text-red-800" // Remove button with hover effect
                                                                onClick={() => handleRemoveFile(index)} // Handle file removal
                                                            >
                                                                <XMarkIcon className="w-4 h-4" aria-hidden="true" />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={() => handleOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
    )
}
