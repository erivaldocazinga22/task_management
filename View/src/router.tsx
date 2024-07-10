import { createBrowserRouter } from "react-router-dom";

/* Public Routers */
import PublicLayout from "./app/pages/Layout";
import NotFound404 from "./app/pages/404";
import SignIn from "./app/pages/SignIn";

/* Private Routers */
import RootLayout from "./app/pages/private/Layout";
import Home from "./app/pages/private/Home";
import Tasks from "./app/pages/private/Tasks";
import Teams from "./app/pages/private/Teams";


export const Routers = createBrowserRouter([
	{
		element: <PublicLayout />,
		errorElement: <NotFound404 />,
		children: [
			{
				path: "/login",
				element: <SignIn />
			}
		]
	},
	{
		element: <RootLayout />,
		errorElement: <NotFound404 />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/mytasks",
				element: <Tasks />
			},
			{
				path: "/teams",
				element: <Teams />
			},
		]
	}
]);