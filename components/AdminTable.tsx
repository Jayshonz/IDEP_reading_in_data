"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CaseStudy } from "@/lib/types";

interface Props {
  studies: CaseStudy[];
}

export default function AdminTable({ studies }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    setDeletingId(id);

    await fetch(`/api/case-studies?id=${id}`, { method: "DELETE" });

    setDeletingId(null);
    router.refresh();
  };

  if (studies.length === 0) {
    return (
      <div className="text-center py-12 text-beehiiv-gray text-sm">
        No case studies yet. Add one above.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-beehiiv-dark mb-4">
        All Case Studies ({studies.length})
      </h2>
      <div className="bg-white border border-beehiiv-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-beehiiv-border">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-beehiiv-dark">
                Title
              </th>
              <th className="text-left px-5 py-3 font-semibold text-beehiiv-dark hidden sm:table-cell">
                Advertiser
              </th>
              <th className="text-left px-5 py-3 font-semibold text-beehiiv-dark hidden md:table-cell">
                Added
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-beehiiv-border">
            {studies.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-beehiiv-dark font-medium max-w-xs truncate">
                  {s.title}
                </td>
                <td className="px-5 py-3 text-beehiiv-gray hidden sm:table-cell">
                  {s.advertiser_name}
                </td>
                <td className="px-5 py-3 text-beehiiv-gray hidden md:table-cell">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deletingId === s.id}
                    className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-50 transition-colors"
                  >
                    {deletingId === s.id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
