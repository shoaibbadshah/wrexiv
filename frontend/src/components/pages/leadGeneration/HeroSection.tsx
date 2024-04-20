import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
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
                <h1 className="mt-0 text-3xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                  Borderless Business <br />
                </h1>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Global Deel advanced AI solutions take the complexity out of
                  overseas expansion. Put your business on the global stage.
                </p>
                <div className="mt-4 flex items-center gap-x-6 flex-wrap">
                  <Link
                    href="/sign_up"
                    className="rounded-md bg-indigo-600 px-8 py-5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ marginBottom: "8px" }}
                  >
                    Try Beta for Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Image
                src="/screen.png"
                layout="responsive"
                width={2432}
                height={1442}
                alt="community"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
