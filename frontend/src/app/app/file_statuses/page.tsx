"use client";

import {
  useDocumentStatusesQuery,
  useRetryDocumentMutation,
} from "@/graphql/generated";
import Link from "next/link";
import { useEffect } from "react";

const TalentProfiles = () => {
  const { data, loading, refetch } = useDocumentStatusesQuery();
  const [retryDocument] = useRetryDocumentMutation();
  const fileStatuses = data?.documentStatuses || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleRetry = (id: string) => {
    retryDocument({ variables: { input: { id } } });
    // Delay refetch to give time for the server to process the retry
    setTimeout(() => refetch(), 100);
  };

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            File statuses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the status of the files you have uploaded.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="flex flex-row gap-4">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => refetch()}
            >
              Refresh
            </button>
            <Link href="/app/test_upload_file">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add files
              </button>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <p className="mt-2 text-sm text-gray-700">Loading file data...</p>
      ) : !fileStatuses ? (
        <p className="mt-2 text-sm text-gray-700">
          No file statuses found. Upload a file to get started.
        </p>
      ) : (
        <div className="flex justify-center mt-8 h-[75vh] max-h-[75vh]">
          <div className="-mx-4 -my-2 overflow-y-auto overflow-x-hidden sm:-mx-6 lg:-mx-8 w-full">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {fileStatuses.map(file => (
                    <tr
                      key={file.id}
                      className={`cursor-pointer hover:bg-gray-100`}
                    >
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {file.documentName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {file.status}
                      </td>
                      <td>
                        {file.status === "FAILURE" && (
                          <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleRetry(file.id)}
                          >
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentProfiles;
