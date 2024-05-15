import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { destroyCookie } from "nookies";
import { signOutFromFirebaseAuth } from "@/lib/firebase";
import Image from "next/image";
import useAuthUser from "@/hooks/useAuthUser";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOutAuth } from "@/store/authSlice";
import { client } from "@/providers/ApolloClientProvider";
import { usePathname } from "next/navigation";

const userNavigation = [{ name: "Agency Settings", href: "/app/agency" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ApplicationLayoutUserMenu = () => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleSignOut = () => {
    destroyCookie(null, "accessToken");
    destroyCookie(null, "uid");

    client.resetStore();
    signOutFromFirebaseAuth();
    dispatch(signOutAuth());
  };

  return (
    <Menu as="div" className="relative">
      {user ? (
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full bg-gray-50"
            src="/leads/lead11.png"
            alt="noavatar"
            width="40"
            height="40"
          />
          <span className="hidden lg:flex lg:items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"
            >
              {""}
            </span>
            <span>{user.email}</span>
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      ) : (
        <div>
          <Link href="/sign_in">
            <button className="btn btn-ghost">Sign In</button>
          </Link>
        </div>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 min-w-32 origin-top-right rounded-md bg-white p-4 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map(item => {
            return (
              <Menu.Item key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.href === pathname ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  {item.name}
                </Link>
              </Menu.Item>
            );
          })}
          <Menu.Item>
            <button
              className={classNames(
                "block px-3 py-1 text-sm leading-6 text-gray-900"
              )}
              onClick={() => {
                handleSignOut();
              }}
            >
              Sign out
            </button>
          </Menu.Item>
          <div className="divider my-1" />
          <Menu.Item>
            <Link href="/">
              <button className="block px-3 py-1 text-sm leading-6 text-gray-900">
                Top Page
              </button>
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ApplicationLayoutUserMenu;
