"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStudy } from "@/lib/types";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";

interface Props {
  studies: CaseStudy[];
  initialStudyId?: string;
}

export default function Gallery({ studies, initialStudyId }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<CaseStudy | null>(
    () => studies.find((s) => s.id === initialStudyId) ?? null
  );

  const openStudy = (study: CaseStudy) => {
    setSelected(study);
    router.replace(`/?study=${study.id}`, { scroll: false });
  };

  const closeStudy = () => {
    setSelected(null);
    router.replace("/", { scroll: false });
  };

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
            onClick={openStudy}
          />
        ))}
      </div>
      {selected && (
        <CaseStudyModal study={selected} onClose={closeStudy} />
      )}
    </>
  );
}
