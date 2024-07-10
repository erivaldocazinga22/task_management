import { useSession } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicLayout() {
	const { data: loggedUser, isPending } = useSession();

	if (!isPending && loggedUser) {
		return <Navigate to="/" replace={true} />;
	}

	return !loggedUser && (
		<div>
			<Outlet />
		</div>
  	);
}
