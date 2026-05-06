"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    advertiser_name: "",
    thumbnail_url: "",
    full_image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/case-studies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    setForm({ title: "", advertiser_name: "", thumbnail_url: "", full_image_url: "" });
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-beehiiv-border p-6 space-y-4">
      <h2 className="text-lg font-bold text-beehiiv-dark">Add New Case Study</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-beehiiv-dark mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="How Brand X grew 3x with beehiiv"
            className="w-full border border-beehiiv-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beehiiv-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-beehiiv-dark mb-1">
            Advertiser Name
          </label>
          <input
            type="text"
            name="advertiser_name"
            value={form.advertiser_name}
            onChange={handleChange}
            required
            placeholder="Acme Corp"
            className="w-full border border-beehiiv-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beehiiv-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-beehiiv-dark mb-1">
            Thumbnail Image URL
          </label>
          <input
            type="url"
            name="thumbnail_url"
            value={form.thumbnail_url}
            onChange={handleChange}
            required
            placeholder="https://..."
            className="w-full border border-beehiiv-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beehiiv-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-beehiiv-dark mb-1">
            Full Case Study Image URL
          </label>
          <input
            type="url"
            name="full_image_url"
            value={form.full_image_url}
            onChange={handleChange}
            required
            placeholder="https://..."
            className="w-full border border-beehiiv-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beehiiv-orange"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-beehiiv-orange hover:bg-beehiiv-orange-hover disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
      >
        {loading ? "Adding…" : "Add Case Study"}
      </button>
    </form>
  );
}
