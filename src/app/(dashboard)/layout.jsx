import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import PrivateRoute from "@/private/PrivateRoute";

export default function layout({ children }) {
  return (
    <PrivateRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="p-6 bg-[#F6F6F6] w-full h-[calc(100vh-92px)] overflow-auto custom_scroll">
            {children}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
