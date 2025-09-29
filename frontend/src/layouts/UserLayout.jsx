import DashboardNavbar from "@/components/user/DashboardNavbar"

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="flex-grow">{children}</main>
      {/* Optional Footer */}
    </div>
  )
}
