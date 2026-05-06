"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { CaseStudy } from "@/lib/types";

interface Props {
  study: CaseStudy;
  onClose: () => void;
}

export default function CaseStudyModal({ study, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-beehiiv-border">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-beehiiv-orange">
              {study.advertiser_name}
            </p>
            <h2 className="text-lg font-bold text-beehiiv-dark mt-0.5">
              {study.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-beehiiv-gray hover:text-beehiiv-dark transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
          <div className="relative w-full">
            <Image
              src={study.full_image_url}
              alt={study.title}
              width={1200}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
