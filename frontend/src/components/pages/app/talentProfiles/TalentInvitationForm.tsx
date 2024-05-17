import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  handleInvite: (email: string) => void;
};

interface ITalentInvitationForm {
  email: string;
}

const initialSetupSchema: ZodType<ITalentInvitationForm> = z.object({
  email: z.string().email("Invalid email address"),
});

export default function TalentInvitationForm({
  open,
  handleClose,
  handleInvite,
}: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ITalentInvitationForm>({
    resolver: zodResolver(initialSetupSchema),
  });

  const handleCancel = () => {
    handleClose();
  };

  const onSubmit = (params: ITalentInvitationForm) => {
    handleInvite(params.email);
    handleClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={() => handleClose()}>
        <div className="fixed inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 overflow-hidden bg-gray-800 bg-opacity-20 transition-opacity">
              <div className="pointer-events-none fixed flex max-w-full mt-16 inset-0 mx-2">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl m-auto overflow-hidden">
                  <form
                    className="flex h-full flex-col bg-white shadow-xl"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Invite Talent
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              This talent's email can't be extracted from the
                              file. Please enter the email manually.
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
                      <div className="mx-8 sm:mx-16 my-8">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-1"
                          >
                            Talent Email
                          </label>
                          <input
                            id="email"
                            type="text"
                            {...register("email")}
                            className="border px-3 py-2 rounded w-full disabled:bg-gray-100"
                          />
                          {errors.email?.message && (
                            <p className="mt-1 text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!isDirty}
                          className={`inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                                        ${!isDirty ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
