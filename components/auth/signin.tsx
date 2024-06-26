"use client";
import Link from "next/link";
import { useState } from "react";
import { signin, signinWithOAuth } from "@/app/(auth)/actions";
import { Provider } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "../ui/icons";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    const response = await signin(formData);
    if (response) {
      setErrorMessage(response.error);
    }
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    await signinWithOAuth(provider);
  };
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Page header */}
          <div className="md:pb-17 mx-auto max-w-3xl pb-10 text-center text-3xl lg:text-4xl">
            <h1 className="h1">Welcome back</h1>
          </div>

          {/* Form */}
          <div className="mx-auto max-w-sm">
            <form onSubmit={(e) => handleOAuthSignIn("google")}>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3">
                  <Button
                    size={"lg"}
                    className="relative flex w-full items-center bg-red-600 px-0 text-white-main hover:bg-red-700 hover:shadow-sm"
                  >
                    <GoogleLogo className="text-white mx-4 h-4 w-4 shrink-0" />
                    <span
                      className="border-white mr-4 flex h-6 items-center border-r border-opacity-25"
                      aria-hidden="true"
                    ></span>
                    <span className="-ml-16 flex-auto pl-16 pr-8">
                      Sign in with Google
                    </span>
                  </Button>
                </div>
              </div>
            </form>
            <form onSubmit={(e) => handleOAuthSignIn("github")}>
              <div className="-mx-3 flex flex-wrap">
                <div className="mt-6 w-full px-3">
                  <Button
                    size={"lg"}
                    className="btn text-white relative flex w-full items-center bg-gray-700 px-0 text-white-main hover:bg-gray-800"
                  >
                    <svg
                      aria-hidden="true"
                      className="text-white mx-4 h-4 w-4 shrink-0"
                      viewBox="0 0 16 16"
                      width="24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                        fill="#FFFFFF"
                      ></path>
                    </svg>
                    <span
                      className="border-white mr-4 flex h-6 items-center border-r border-opacity-25"
                      aria-hidden="true"
                    ></span>
                    <span className="-ml-16 flex-auto pl-16 pr-8">
                      Sign in with GitHub
                    </span>
                  </Button>
                </div>
              </div>
            </form>
            <div className="my-6 flex items-center">
              <div
                className="mr-3 grow border-t border-dotted border-gray-700"
                aria-hidden="true"
              ></div>
              <div className="text-gray-700">Or, sign in with your email</div>
              <div
                className="ml-3 grow border-t border-dotted border-gray-700"
                aria-hidden="true"
              ></div>
            </div>
            <form onSubmit={handleSignIn}>
              <div className="-mx-3 mb-4 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-input w-full text-gray-700"
                    placeholder="helloworld@email.com"
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-4 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-input w-full text-gray-700"
                    placeholder="********"
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-4 flex flex-wrap">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="ml-2 text-gray-500">
                        Keep me signed in
                      </span>
                    </label>
                    <Link
                      href="/reset-password"
                      className="text-primary-700 transition duration-150 ease-in-out hover:text-primary-800"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="text-center text-sm text-red-600">
                  {errorMessage}
                </div>
              )}
              <div className="-mx-3 mt-6 flex flex-wrap">
                <div className="w-full px-3">
                  <Button
                    size={"lg"}
                    className="w-full bg-primary-700 text-white-main hover:bg-primary-800 hover:shadow-sm"
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-6 text-center text-gray-400">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary-700 transition duration-150 ease-in-out hover:text-primary-800"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
