"use client";

import { ReactNode, useEffect } from "react";
import ReduxProvider from "@/providers/ReduxProvider";
import { usePathname, useRouter } from "next/navigation";
import LandingPageLayout from "./LandingPageLayout";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import useAuthUser from "@/hooks/useAuthUser";
import BlogLayout from "./BlogLayout";
import ApplicationLayout from "./ApplicationLayout";
import ApolloClientProvider from "@/providers/ApolloClientProvider";
import Snackbar from "../organisms/Snackbar";
import useFlash from "@/hooks/useFlash";
import { FIRST_APP_PAGE } from "@/constants/urls";
import TranslationProvider from "@/providers/TranslationProvider";
import AdminLayout from "./AdminLayout";
import MuiThemeProvider from "@/providers/MuiThemeProvider";

const AUTH_PAGE_PATHS = ["/sign_in", "/sign_up", "/app/verifying"];
const APP_PAGE_PATHS = ["app"];
const TRIAL_PAGE_PATHS = ["/app/trial"];

const LayoutRouter = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthUser();
  const { showMessage } = useFlash();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        dispatch(
          setUser({
            email: user.email || "",
          })
        );
        if (user.emailVerified) {
          if (TRIAL_PAGE_PATHS.includes(pathname)) {
            router.replace(FIRST_APP_PAGE);
          }
          if (AUTH_PAGE_PATHS.includes(pathname)) {
            router.replace(FIRST_APP_PAGE);
            /* if (tenant) {
              router.push("/app/projects");
            } else {
              router.push("/app/setup");
            } */
          }
        }
      } else {
        if (APP_PAGE_PATHS.includes(firstPath)) {
          if (!TRIAL_PAGE_PATHS.includes(pathname)) {
            router.replace("/sign_in");
          }
        }
      }
    });

    return () => unsubscribe();
  }, [router, dispatch, pathname, firstPath]);

  if (firstPath === "blog") {
    return <BlogLayout>{children}</BlogLayout>;
  }

  if (firstPath === "app") {
    return <ApplicationLayout>{children}</ApplicationLayout>;
  }

  if (firstPath === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <LandingPageLayout>{children}</LandingPageLayout>;
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
      <ApolloClientProvider>
        <MuiThemeProvider>
          <TranslationProvider>
            <LayoutRouter>{children}</LayoutRouter>
            <Snackbar />
          </TranslationProvider>
        </MuiThemeProvider>
      </ApolloClientProvider>
    </ReduxProvider>
  );
};

export default Layout;
