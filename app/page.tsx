"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };

    checkSession();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      if (authListener?.data?.subscription?.unsubscribe) {
        authListener.data.subscription.unsubscribe();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-100 via-white to-slate-50">
        <p className="text-lg text-slate-700">Loading...</p>
      </div>
    );
  }

  const isSignedIn = !!session;

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-100 via-white to-slate-50 text-slate-900">
      <main className="flex-1 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        {!isSignedIn ? (
          <section className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">Welcome to DBS Blog</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Modern tech stories and tutorials for every developer.
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                Get weekly insights, practical guides, and real-world examples built for Database Management System enthusiasts. Sign up to unlock all content and stay updated with the latest posts.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Create account
                </Link>
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Sign in
                </Link>
              </div>
            </div>
            <div className="rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-1 shadow-lg">
              <div className="h-64 rounded-lg bg-white p-6 sm:h-72 md:h-80">
                <p className="text-xl font-semibold text-slate-900">Latest Post</p>
                {/* <h2 className="mt-2 text-2xl font-bold text-slate-800">Build Responsive Blog Layouts with Next.js and Tailwind</h2>
                <p className="mt-3 text-sm text-slate-600">A beginner-friendly tutorial with code samples and best practices for 2026.</p> */}
                <p className="mt-3 text-xl font-bold text-slate-600">This website is a DBS learning blog focused on Database Management System concepts, practical examples, and hands on exercises to help master DBMS.</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href="https://github.com/tadashi-dev-eng"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    GitHub Profile
                  </a>
                  {/* <a
                    href="https://www.linkedin.com/in/<your-linkedin-id>"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    LinkedIn Profile
                  </a> */}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">Welcome back</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Dashboard: Pick your Unit
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                Choose one of the units below to view full article content and notes on each unit.
              </p>
            </div>
            <div className="rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-1 shadow-lg">
              <div className="h-64 rounded-lg bg-white p-6 sm:h-72 md:h-80">
                <p className="text-lg font-semibold text-slate-900">Ready to learn?</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">Explore units directly</h2>
                <p className="mt-3 text-sm text-slate-600">No sign up/sign in buttons here, you are already authenticated.</p>
              </div>
            </div>
          </section>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Unit 1", desc: "Introduction to NoSQL Databases", slug: "unit1" },
            { title: "Unit 2", desc: "Redis Architecture", slug: "unit2" },
            { title: "Unit 3", desc: "Coming soon", slug: "unit3" },
          ].map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              <Link
                href={isSignedIn ? `/articles/${item.slug}` : "/signin"}
                className="mt-4 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
              >
                {isSignedIn ? "Open unit" : "Login to open"}
              </Link>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex w-full max-w-6xl justify-center px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          <span className="text-center">© {new Date().getFullYear()} Tashi Penjor. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
