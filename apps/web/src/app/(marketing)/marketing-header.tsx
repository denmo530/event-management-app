"use client";

import { Button } from "@web/components/ui/button";
import { SignedIn, SignedOut, SignUpButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import { Logo } from "@web/components/logo";

export function Header() {
  const clerk = useClerk();

  return (
    <header className=" z-30 w-full py-4  border-b light:bg-gray-50 transition-all duration-300 ">
      <nav className=" w-full flex items-center">
        <div className="mx-auto container px-4 lg:px-20 pt-0">
          {/* Mobile header */}
          <div className="w-full items-center flex flex-row justify-between md:hidden"></div>

          {/* Desktop header */}
          <div className="flex flex-row items-center">
            <div className={"flex w-4/12 items-center space-x-4 lg:space-x-8"}>
              <Logo href="/" />
            </div>

            <div className={"flex w-4/12 justify-center"}>
              <div className="hidden md:flex space-x-8 items-center justify-center ">
                <span className="inline-block text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer">
                  Features
                </span>
                <span className="inline-block text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer">
                  Pricing
                </span>
                <Link
                  href="#"
                  className="text-sm font-base hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                >
                  Changelog
                </Link>
                <Link
                  href="#"
                  className="text-sm font-base hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                >
                  Roadmap
                </Link>
              </div>
            </div>

            <div
              className={
                "flex w-4/12 flex-1 items-center justify-end space-x-4"
              }
            >
              <div className={"hidden space-x-2 lg:flex gap-4"}>
                <SignedOut>
                  <div className="hidden md:flex items-center ">
                    <span
                      onClick={() =>
                        clerk.openSignIn({
                          fallbackRedirectUrl: "/dashboard",
                        })
                      }
                      className="text-sm font-medium hover:text-neutral-900 text-neutral-500 duration-200 dark:text-neutral-400 dark:hover:text-white hover:cursor-pointer"
                    >
                      Login
                    </span>
                  </div>
                  <SignUpButton mode="modal">
                    <Button className="inline-flex items-center justify-center font-semibold h-9 text-sm transition duration-200">
                      Get Started Now
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button className="inline-flex items-center justify-center font-semibold h-9 text-sm transition duration-200">
                      Dashboard
                    </Button>
                  </Link>
                </SignedIn>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
