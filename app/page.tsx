import { createClient } from "@/lib/supabase/server";
import Gallery from "@/components/Gallery";
import { CaseStudy } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: { study?: string };
}) {
  const supabase = await createClient();
  const { data: studies } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-beehiiv-dark tracking-tight">
          Advertiser Case Studies
        </h1>
        <p className="mt-3 text-beehiiv-gray text-lg max-w-2xl">
          Real results from brands growing with the beehiiv Ad Network. Click
          any card to see the full case study.
        </p>
      </div>
      <Gallery
        studies={(studies as CaseStudy[]) ?? []}
        initialStudyId={searchParams.study}
      />
    </div>
  );
}
