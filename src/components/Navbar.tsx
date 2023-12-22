import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { ToogleButton } from "./ToggleButton";
import { Button, buttonVariants } from "./ui/button";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <nav className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300  dark:border-slate-700 shadow-sm  flex items-center justify-between">
      <div className="container max-w-7xl mx-auto  w-full flex justify-between items-center ">
        <Link href="/" className=" cursor-pointer font-bold leading-6 tracking-wide ">
        TextTwin API
        </Link>
        <div className="md:hidden">
          <ToogleButton />
        </div>

        <div className="hidden md:flex gap-4 ">
          <ToogleButton />

          <Link className={buttonVariants({ variant: "ghost" })} href="/documentation">
            documentation
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <SignInButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
