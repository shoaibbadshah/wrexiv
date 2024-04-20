import Link from "next/link";
import Image from "next/image";
import { JAPAN_COMMUNITY_SUBMIT_FORM_URL } from "@/constants/urls";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const getDate = () => {
  const today = new Date();
  const tenDaysLater = new Date(today);
  tenDaysLater.setDate(tenDaysLater.getDate() + 10);
  const formattedDate = tenDaysLater.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export default function Example() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mt-20 sm:mt-24 lg:mt-0">
                  <a href="#" className="inline-flex space-x-6">
                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600"></span>
                  </a>
                </div>
                <h1 className="mt-0 text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                  Connect with key persons for business expansion <br />
                </h1>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  This is an appointment scoring service to set up depth
                  interviews with 3 clients, 3 sales agents, and 3 experts.
                </p>
                <div className="mt-4 flex items-center gap-x-6 flex-wrap">
                  <a
                    href={JAPAN_COMMUNITY_SUBMIT_FORM_URL}
                    className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ marginBottom: "8px" }}
                  >
                    Start free trial
                  </a>
                  <div>
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Discuss business needs and find appointments via chat
                      service. Unlimited consultations with experts for $399.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            ></div>
            <div className="md:rounded-3xl">
              <Image
                src="/globaldeel_fv_image.png"
                layout="responsive"
                width={400}
                height={200}
                alt="community"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
