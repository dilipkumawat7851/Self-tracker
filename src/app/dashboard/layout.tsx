import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Dashboard — SelfTracker",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6] dark:bg-[#0B0F19] text-text-primary transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen transition-all duration-300 relative">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
