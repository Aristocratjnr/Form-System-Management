// src/app/page.tsx

import Image from "next/image";
import FormFieldCreator from "../app/FormFieldCreator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormFieldCreator /> {/* Add the FormFieldCreator component here */}
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30">
          Form Management System&nbsp;
          <code className="font-mono font-bold">Medicalwebapp</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/aristocratjnr"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Obuobi Ayim David
            
          </a>
        </div>
      </div>
    </main>
  );
}
