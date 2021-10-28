import Home from "../pages/Home";
import Signin from "pages/Signin";
import Email from "pages/Email";
import Signup from "pages/Signup";
import RecoveryPassword from "pages/RecoveryPassword";
import Documents from "pages/PersonalData/Documents";
import Attorney from "pages/PersonalData/Attorney";
import Company from "pages/PersonalData/Company";
import Integration from "pages/PersonalData/Integration";
import Operation from "pages/PersonalData/Operation";

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
    path: "/Attorney",
    title: "Attorney",
    component: Attorney,
    private: true,
  },
  {
    path: "/company",
    title: "Company",
    component: Company,
    private: true,
  },
  {
    path: "/documents",
    title: "Personal Documents",
    component: Documents,
    private: true,
  },
  {
    path: "/operation",
    title: "Operation",
    component: Operation,
    private: true,
  },
  {
    path: "/integration",
    title: "Integration",
    component: Integration,
    private: true,
  },
];
