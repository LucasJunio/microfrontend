import Home from "../pages/Home";
import Signin from "pages/Signin";
// import RegisterList from "../pages/Customer/ApproveRegister/ListView";
// import UserList from "../pages/UserSystem/User/ListView";
// import User from "../pages/UserSystem/User/FormView";
// import GroupList from "../pages/UserSystem/Group/ListView";
// import EditUser from "../pages/UserSystem/User/EditView";

export const routes = [
  { path: "/dashboard", title: "Home", component: Home, private: true },
  { path: "/signin", title: "Signin", component: Signin, private: false },
  // { path: "/userList", title: "Usuário", component: UserList },
  // {
  //   path: "/userConfig",
  //   title: "Configuração de Usuário",
  //   component: User,
  // },
  // { path: "/groupList", title: "Grupo", component: GroupList },
  // { path: "/registerList", title: "Grupo", component: RegisterList },
  // { path: "/editUser/:id", title: "EditUser", component: EditUser },
];
