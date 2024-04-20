import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  {
    key: "process",
    url: "#processSection",
    label: "Process",
  },
  {
    key: "solutions",
    url: "/lead_generation",
    label: "Solutions↓",
  },
  {
    key: "case-study",
    url: "#caseStudy",
    label: "Case Study",
  },
  /*{
    key: "content-marketing",
    url: "/content_marketing",
    label: "Content Marketing",
  },*/
];

export default function PortfolioHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 space-x-8">
          <Link href="/">
            <span className="sr-only">GlobalDeel</span>
            <Image src="/logo.png" alt="logo" height="60" width="200" />
          </Link>
        </div>
        <div className="hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div> */}
        <div className="space-x-4 hidden lg:flex items-center">
          {navigation.map(item => {
            return (
              <Link
                key={item.key}
                href={item.url}
                className="whitespace-nowrap"
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="#contactSection">
            <button className="btn bg-black text-white">Contact Us</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
