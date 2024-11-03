import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/navigation/Sidebar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed navbar */}
      <div className="sticky top-0 z-40 bg-white">
        <Navbar />
      </div>

      <div className="flex">
        {/* Fixed sidebar */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Scrollable main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}