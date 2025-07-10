import Dashboard from "@/components/Dashboard";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className="w-full h-screen flex gap-5 lg:gap-8 px-3 lg:px-5 py-4">
      <SideBar />
      <Dashboard />
    </div>
  );
}
