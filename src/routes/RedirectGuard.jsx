import { useEffect, useState } from "react";
import Loading from "../pages/Loading";
import supabase from "../supabase/supabaseClient";
import { Navigate, Outlet } from "react-router";
import { PrivateRoutes } from "./routes";

const RedirectGuard = () => {
	const [session, setSession] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setLoading(false);
		};
		getSession();
	}, []);

	if (loading) {
		return <Loading />;
	}
	if (!session) {
		return <Outlet />;
	} else {
		return <Navigate replace to={PrivateRoutes.Dashboard} />;
	}
};
export default RedirectGuard;
