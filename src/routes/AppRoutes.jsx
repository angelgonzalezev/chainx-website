import Home from "../pages/Home";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Route, Routes } from "react-router";
// import BetaRecordingComponent from "../pages/BetaRecording/components/BetaRecordingComponent";
import RedirectGuard from "./RedirectGuard";
import AuthGuard from "./AuthGuard";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
// import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import DashboardLayout from "../layouts/DashboardLayout";
import RecordSession from "../pages/RecordSession";
import Settings from "../pages/Settings";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={PublicRoutes.Home} element={<Home />} />
			{/* <Route path={PublicRoutes.RecordingSession} element={<BetaRecordingComponent />} /> */}
			<Route element={<RedirectGuard />}>
				<Route path={PublicRoutes.Login} element={<Login />} />
				<Route path={PublicRoutes.CreateAccount} element={<CreateAccount />} />
				<Route path={PublicRoutes.ForgotPassword} element={<ForgotPassword />} />
			</Route>
			<Route path={PublicRoutes.ResetPassword} element={<ResetPassword />} />
			<Route element={<AuthGuard />}>
				<Route
					path={PrivateRoutes.Dashboard}
					element={
						<DashboardLayout>
							<Patients />
						</DashboardLayout>
					}
				/>
				{/* <Route
					path={PrivateRoutes.Patients}
					element={
						<DashboardLayout>
							<Patients />
						</DashboardLayout>
					}
				/> */}
				<Route
					path={PrivateRoutes.RecordSession}
					element={
						<DashboardLayout>
							<RecordSession />
						</DashboardLayout>
					}
				/>
				<Route
					path={PrivateRoutes.Settings}
					element={
						<DashboardLayout>
							<Settings />
						</DashboardLayout>
					}
				/>
				{/* <Route
					path={PrivateRoutes.Bookings}
					element={
						<DashboardLayout>
							<Settings />
						</DashboardLayout>
					}
				/> */}
			</Route>
		</Routes>
	);
};
export default AppRoutes;
