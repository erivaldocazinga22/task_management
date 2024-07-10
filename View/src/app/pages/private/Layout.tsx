import { Header } from "@/app/components/Layout/Header";
import Sidebar from "@/app/components/Layout/Sidebar";
import { useSession } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function RootLayout() {
  const { data: loggedUser, isPending } = useSession();

   if (!isPending && !loggedUser) {
    return <Navigate to="/login" replace={true} />;
  }

  return loggedUser && (
    <div className="flex">
        <Sidebar />
        <div className="w-full">
            <Header />
            <Outlet />
        </div>
    </div>
  )
}
