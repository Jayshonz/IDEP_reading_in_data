"use client";

import { useState } from "react";
import { CaseStudy } from "@/lib/types";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";

interface Props {
  studies: CaseStudy[];
}

export default function Gallery({ studies }: Props) {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  if (studies.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-beehiiv-gray text-lg">
          No case studies yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            onClick={setSelected}
          />
        ))}
      </div>
      {selected && (
        <CaseStudyModal study={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
