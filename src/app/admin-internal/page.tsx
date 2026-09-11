import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { supabaseAdmin } from "@/lib/supabase";

export default async function AdminSecretLogin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // If not logged in, we can either redirect to /api/auth/signin or show a custom "Access Denied" or login button.
    redirect("/api/auth/signin?callbackUrl=/adminham-kece-secret-login");
  }

  // Session user is validated by the NextAuth callback (must be Antares023)

  // Fetch all data for the dashboard
  const [
    { data: projects },
    { data: toolboxCategories },
    { data: toolboxItems },
    { data: experiences },
    { data: certificates }
  ] = await Promise.all([
    supabaseAdmin.from('Project').select('*').order('order', { ascending: true }),
    supabaseAdmin.from('ToolboxCategory').select('*').order('order', { ascending: true }),
    supabaseAdmin.from('ToolboxItem').select('*'),
    supabaseAdmin.from('Experience').select('*').order('order', { ascending: true }),
    supabaseAdmin.from('Certificate').select('*').order('order', { ascending: true }),
  ]);
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gh-text font-mono">Admin Control Center</h1>
          <p className="text-gh-text-muted mt-2">Welcome back, Commander {session.user?.name}.</p>
        </div>
        <a 
          href="/api/auth/signout" 
          className="dev-btn border-red-500/30 text-red-400 hover:border-red-500/80"
        >
          Logout
        </a>
      </div>
      
      {/* Client component for the interactive dashboard */}
      <AdminDashboard 
        initialProjects={projects || []} 
        initialToolboxCategories={toolboxCategories || []}
        initialToolboxItems={toolboxItems || []}
        initialExperiences={experiences || []}
        initialCertificates={certificates || []}
      />
    </div>
  );
}
