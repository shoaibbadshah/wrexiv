"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useTalentProfilesQuery } from "@/graphql/generated";
import TalentDetails from "./TalentDetails";
import TalentAddForm from "./TalentAddForm";
import Talent from "@/types/TalentProfileType";

const TalentProfiles = () => {
  const { data, loading, error } = useTalentProfilesQuery();

  const [talentData, setTalentData] = useState<Talent[] | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setTalentData(data.talentProfiles as Talent[]);
    }
  }, [data]);

  const handleOpenDetails = (open: boolean, talent: Talent | null = null) => {
    setOpenDetails(open);
    setSelectedTalent(talent);
  }

  const handleOpenForm = (open: boolean) => {
    setOpenForm(open);
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Talents</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the talents in your account including their name and bio.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => handleOpenForm(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Talent
          </button>
        </div>
      </div>
      {loading ? (
        <p className="mt-2 text-sm text-gray-700">Loading talent data...</p>
      ) : (
        talentData && (
          <div className="flex justify-center mt-8 h-[75vh] max-h-[75vh]">
            <div className="-mx-4 -my-2 overflow-y-auto overflow-x-hidden sm:-mx-6 lg:-mx-8 w-full">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                        Name
                      </th>
                      <th scope="col" className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                        Bio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {talentData.map((talent) => (
                      <tr
                        key={talent.id}
                        onClick={() => handleOpenDetails(true, talent)}
                        className={`cursor-pointer hover:bg-gray-100 ${talent.id === selectedTalent?.id ? 'bg-blue-100' : ''}`}
                      >
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <Image
                                src={talent.avatar}
                                alt=""
                                width={44}
                                height={44}
                                className="rounded-full"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{talent.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{talent.bio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      )}

      {selectedTalent &&
        <TalentDetails
          open={openDetails}
          handleOpen={handleOpenDetails}
          talent={selectedTalent}
        />
      }

      {openForm &&
        <TalentAddForm
          open={openForm}
          handleOpen={handleOpenForm}
        />
      }
    </div>
  );
};

export default TalentProfiles;

