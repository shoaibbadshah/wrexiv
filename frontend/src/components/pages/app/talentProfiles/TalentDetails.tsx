import { useState } from 'react'
import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import TalentDeleteWarning from "./TalentDeleteWarning";
import Talent from './Types'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type PropsType = {
  open: boolean;
  handleOpen: (open: boolean) => void;
  talent: Talent;
}

export default function TalentDetails({
  open,
  handleOpen,
  talent,
}: PropsType) {

  const [openWarning, setOpenWarning] = useState<boolean>(false)

  const handleDelete = (id: string) => {
    console.log(`Delete talent with id: ${id}`)
    handleOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => handleOpen(false)}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden bg-gray-100 bg-opacity-50 transition-opacity">
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2 id="slide-over-heading" className="text-base font-semibold leading-6 text-gray-900">
                            Profile
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
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
                      <div>
                        <div className="pb-1 sm:pb-6">
                          <div>
                            <div className="relative h-40 sm:h-56">
                              <Image
                                className="absolute h-full w-full object-cover"
                                src={talent.avatar}
                                alt=""
                                layout="fill"
                              />
                            </div>
                            <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                              <div className="sm:flex-1">
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{talent.name}</h3>
                                    <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                      <span className="sr-only">Online</span>
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500">@{talent.name.replace(/\s+/g, '').toLowerCase()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            <div>
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Bio</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                <p>{talent.bio}</p>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => handleOpen(false)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpenWarning(true)}
                          className="rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          {openWarning &&
            <TalentDeleteWarning
              open={openWarning}
              handleOpen={setOpenWarning}
              talent={talent}
              handleDelete={handleDelete}
            />
          }
        </div>
      </Dialog>
    </Transition.Root>
  )
}
