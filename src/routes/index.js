import Home from "../pages/Home";
import Signin from "pages/Signin";
import Email from "pages/Email";
import Signup from "pages/Signup";
import RecoveryPassword from "pages/RecoveryPassword";
import Documents from "pages/PersonalData/Documents";
import Profile from "pages/PersonalData/Profile"

export const routes = [
  { path: "/email/:token", title: "Email", component: Email, private: false },
  { path: "/signin", title: "Signin", component: Signin, private: false },
  { path: "/signup", title: "Signup", component: Signup, private: false },
  { path: "/dashboard", title: "Home", component: Home, private: true },
  {
    path: "/recoverypassword/:base64",
    title: "Recovery Password",
    component: RecoveryPassword,
    private: false,
  },
  {
    path: "/documents",
    title: "Personal Documents",
    component: Documents,
    private: true,
  },  
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
    private: true,
  },
];
