import { Description, Person, Business } from "@material-ui/icons";
import { mdiSwapHorizontal, mdiConnection } from "@mdi/js";
import Icon from "@mdi/react";

export const sections = [
  {
    subheader: "Dados pessoais",
    section: "personalData",
    open: true,
    items: [
      {
        title: "Representante Legal",
        icon: Person,
        href: "/Attorney",
      },
      {
        title: "Pessoa Jurídica",
        icon: Business,
        href: "/company",
      },
      {
        title: "Documentos",
        icon: Description,
        href: "/documents",
      },
      {
        title: "Operação",
        icon: () => <Icon path={mdiSwapHorizontal} title="Operação" size={1} />,
        href: "/operation",
      },
      {
        title: "Integrações",
        icon: () => <Icon path={mdiConnection} title="Operação" size={1} />,
        href: "/integration",
      },
    ],
  },
];
