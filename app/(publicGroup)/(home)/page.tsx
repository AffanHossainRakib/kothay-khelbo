import { Suspense } from "react";
import { addHit } from "./_actions/addHit";
import HitButton from "./_components/HitButton";
import HitCount from "./_components/HitCount";

// Temporary smoke test: web app -> API -> database.
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Kothay Khelbo</h1>
      <Suspense
        fallback={<p className="text-2xl text-zinc-400">Loading hits...</p>}
      >
        <HitCount />
      </Suspense>
      <form action={addHit}>
        <HitButton />
      </form>
    </main>
  );
}
