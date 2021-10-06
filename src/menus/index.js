import { Description, Person } from "@material-ui/icons";

export const sections = [
  {
    subheader: "Dados pessoais",
    section: "personalData",
    open: true,
    items: [
      {
        title: "Perfil",
        icon: Person,
        href: "/profile",
      },
      {
        title: "Documentos",
        icon: Description,
        href: "/personalDocuments",
      },
    ],
  },
];
