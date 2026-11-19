"use server";

import { refresh } from "next/cache";
import { apiFetch } from "@/lib/api";
import type { Hit } from "@/types/hit";

export async function addHit() {
  await apiFetch<Hit>("/hits", { method: "POST" });
  // Re-render the page's uncached data (the count) without a full reload.
  refresh();
}
