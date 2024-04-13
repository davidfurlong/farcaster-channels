import { Results } from "./results";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className="z-10 w-full flex flex-col font-mono text-sm lg:flex">
        <Results />
      </div>
    </main>
  );
}
