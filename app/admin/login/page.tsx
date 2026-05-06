"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-beehiiv-dark">Admin Login</h1>
          <p className="text-beehiiv-gray text-sm mt-1">
            beehiiv team members only
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-beehiiv-border rounded-2xl p-8 space-y-4 shadow-sm"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-beehiiv-dark mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-beehiiv-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beehiiv-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-beehiiv-dark mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-beehiiv-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beehiiv-orange"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-beehiiv-orange hover:bg-beehiiv-orange-hover disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
