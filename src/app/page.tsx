"use client";

import { RedirectType, redirect } from "next/navigation";

export default function Home() {
  return redirect("auth/login", "replace" as RedirectType);
}
