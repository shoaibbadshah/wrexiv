import { JAPAN_COMMUNITY_SUBMIT_FORM_URL } from "@/constants/urls";
import Link from "next/link";

export default function CTASection() {
  return (
    <div className="px-6 lg:px-8 pb-40">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end"
        aria-hidden="true"
      >
        <div
          // className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
          className="aspect-[1108/632] w-[69.25rem] flex-none opacity-25"
          style={{
            clipPath:
              "polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {"Let's start your journey to Japan today"}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          We will become your greatest and best partner in your expansion into
          Japan and Asia.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href={JAPAN_COMMUNITY_SUBMIT_FORM_URL} target="_blank">
            <button className="btn btn-secondary btn-lg">
              Join Our Platform
            </button>
          </Link>
          {false && (
            <a
              href="/hoge"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
