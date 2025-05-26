import { House, Settings } from "lucide-react";

export const PublicRoutes = {
	Home: "/",
	Login: "/login",
	CreateAccount: "/create-account",
	ResetPassword: "/reset-password",
	ForgotPassword: "/forgot-password",
	RecordingSession: "/recording-session",
};

export const PrivateRoutes = {
	Dashboard: "/dashboard",
	Patients: "/dashboard/patients",
	RecordSession: "/dashboard/record-session",
	Settings: "/dashboard/settings",
	Bookings: "/bookings",
};

export const SidebarMenu = [
	{
		title: "Patients",
		icon: House,
		to: PrivateRoutes.Dashboard,
	},
	// {
	// 	title: "Patients",
	// 	icon: Users,
	// 	to: PrivateRoutes.Patients,
	// },
	{
		title: "Settings",
		icon: Settings,
		to: PrivateRoutes.Settings,
	},
];
