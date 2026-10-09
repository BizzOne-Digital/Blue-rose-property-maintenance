"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Login failed.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy to-royal px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="font-heading text-2xl font-bold text-navy">Admin login</h1>
        <p className="mt-2 text-sm text-navy/60">
          Manage services, main prices, plans, and add-ons.
        </p>
        <label className="mt-6 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy/50">
            Email
          </span>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy/50">
            Password
          </span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-royal py-3 text-sm font-semibold text-white hover:bg-[#064EDB] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
