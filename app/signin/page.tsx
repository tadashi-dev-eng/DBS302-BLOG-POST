"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const from = new URLSearchParams(window.location.search).get("from") || "/";
    router.push(from);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your credentials to access your account.</p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Your password"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-500 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            New here?{' '}
            <Link href="/signup" className="font-semibold text-sky-600 hover:text-sky-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
