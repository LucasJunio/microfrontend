import { Person, Group, LibraryAddCheck } from '@material-ui/icons';

export const sections = [
  {
    subheader: 'Cliente',
    section: 'customer',
    open: false,
    items: [
      {
        title: 'Aprovar Cadastro',
        icon: LibraryAddCheck,
        href: '/dashboard',
      },
    ],
  },
  {
    subheader: 'Configurações',
    section: 'settings',
    open: false,
    items: [
      {
        title: 'Settings',
        icon: LibraryAddCheck,
        href: '/',
      },
    ],
  },
];
