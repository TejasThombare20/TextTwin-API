import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TextTwin API | Home",
  description: "Free & open source text TextTwin API",
};
export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <h1 className="text-black dark:text-light-gold text-center lg:text-left font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
            Easily determine <br /> text similarity.
          </h1>
          <p className="max-w-2xl lg:text-left text-base sm:text-lg  text-slate-700 dark:text-slate-300 mb-2 text-center">
            With the TextTwin API,you can easily determine the similarity
            between two pieces of text with free{" "}
            <Link
              href="/login"
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              API key
            </Link>
          </p>

          <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute ">
            <Image
              priority
              className="img-shadow"
              quality={100}
              style={{ objectFit: "contain" }}
              fill
              src="/typewriter.png"
              alt="typewriter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
