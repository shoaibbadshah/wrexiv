import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  {
    key: "triple-three-interviews",
    url: "/333interview",
    label: "333 Interviews",
  },
  {
    key: "lead-generation",
    url: "/lead_generation",
    label: "Lead Generation",
  },
  /* {
    key: "japan-community",
    url: "/japan_community",
    label: "Japan Community",
  },
   /*{
    key: "content-marketing",
    url: "/content_marketing",
    label: "Content Marketing",
  },*/
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 space-x-8">
          <Link href="/">
            <span className="sr-only">Your Company</span>
            <Image src="/logo.png" alt="logo" height="60" width="200" />
          </Link>
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
          </div>
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
        <div className="hidden lg:flex flex-1 justify-end items-center space-x-6">
          <Link href="/finder">Finder</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/sign_in">
            <button className="btn">Sign In</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
