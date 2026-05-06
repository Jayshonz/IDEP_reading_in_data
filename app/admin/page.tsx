import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminForm from "@/components/AdminForm";
import AdminTable from "@/components/AdminTable";
import { CaseStudy } from "@/lib/types";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: studies } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-beehiiv-dark">Admin Dashboard</h1>
          <p className="text-beehiiv-gray text-sm mt-1">{user.email}</p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="text-sm text-beehiiv-gray hover:text-beehiiv-dark transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      <AdminForm />
      <AdminTable studies={(studies as CaseStudy[]) ?? []} />
    </div>
  );
}
