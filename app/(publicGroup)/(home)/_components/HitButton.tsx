"use client";

import { useFormStatus } from "react-dom";

// Lives inside the <form>; useFormStatus tells it when the action is running.
export default function HitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-white px-4 py-2 text-black disabled:opacity-50"
    >
      {pending ? "Saving..." : "Hit the API"}
    </button>
  );
}
