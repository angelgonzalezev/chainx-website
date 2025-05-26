import { Navigate, Outlet } from "react-router";
import { PublicRoutes } from "./routes";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/states/user";
import Loading from "../pages/Loading";

const AuthGuard = () => {
	const [session, setSession] = useState(false);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		const getSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			dispatch(
				createUser({
					id: session?.user?.id,
					email: session?.user?.email,
					fullname: session?.user?.user_metadata?.full_name,
				})
			);
			setSession(session);
			setLoading(false);
		};
		getSession();
	}, []);

	if (loading) {
		return <Loading />;
	}
	if (!session) {
		return <Navigate replace to={PublicRoutes.Home} />;
	} else {
		return <Outlet />;
	}
};
export default AuthGuard;
