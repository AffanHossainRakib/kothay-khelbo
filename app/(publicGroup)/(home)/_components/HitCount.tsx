import { apiFetch } from "@/lib/api";
import type { HitStats } from "@/types/hit";

// Not cached on purpose: rendered fresh on every request inside <Suspense>.
export default async function HitCount() {
  const stats = await apiFetch<HitStats>("/hits").catch(() => null);

  if (!stats) {
    return <p className="text-red-600">{"Couldn't reach the API."}</p>;
  }
  return <p className="text-2xl font-semibold">Hits: {stats.count}</p>;
}
