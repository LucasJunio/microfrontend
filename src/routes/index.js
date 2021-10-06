import Home from "../pages/Home";
import Signin from "pages/Signin";
import Email from "pages/Email";
import Signup from "pages/Signup";
import RecoveryPassword from "pages/RecoveryPassword";
import PersonalDocuments from "pages/PersonalData/PersonalDocuments";

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
    path: "/personalDocuments",
    title: "Personal Documents",
    component: PersonalDocuments,
    private: true,
  },
];
