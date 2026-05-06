"use client";

import Image from "next/image";
import { CaseStudy } from "@/lib/types";

interface Props {
  study: CaseStudy;
  onClick: (study: CaseStudy) => void;
}

export default function CaseStudyCard({ study, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(study)}
      className="group text-left bg-white rounded-2xl overflow-hidden border border-beehiiv-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-beehiiv-orange"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={study.thumbnail_url}
          alt={`${study.title} thumbnail`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-beehiiv-orange mb-1">
          {study.advertiser_name}
        </p>
        <h3 className="text-base font-semibold text-beehiiv-dark line-clamp-2 leading-snug">
          {study.title}
        </h3>
      </div>
    </button>
  );
}
