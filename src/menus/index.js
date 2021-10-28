import { Description, Person, Business } from "@material-ui/icons";
import { mdiSwapHorizontal, mdiConnection } from "@mdi/js";
import Icon from "@mdi/react";
import store from "../store";

export const sections = () => {
  const {
    signer: { cnpj },
  } = store.getState();
  const sections = [
    {
      subheader: "Dados pessoais",
      section: "personalData",
      open: true,
      items: [
        {
          title: "Representante Legal",
          icon: Person,
          href: "/Attorney",
          isCnpj: false,
        },
        {
          title: "Pessoa Jurídica",
          icon: Business,
          href: "/company",
          isCnpj: !cnpj,
        },
        {
          title: "Documentos",
          icon: Description,
          href: "/documents",
          isCnpj: false,
        },
        {
          title: "Operação",
          icon: () => (
            <Icon path={mdiSwapHorizontal} title="Operação" size={1} />
          ),
          href: "/operation",
          isCnpj: false,
        },
        {
          title: "Integrações",
          icon: () => <Icon path={mdiConnection} title="Operação" size={1} />,
          href: "/integration",
          isCnpj: false,
        },
      ],
    },
  ];

  return sections;
};
