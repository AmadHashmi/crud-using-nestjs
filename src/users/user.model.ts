export interface User {
  id: number;
  name: string;
  roles: string[];
  groups: string[];
}

export interface Role {
  name: string;
  code: string;
  permissions: string[];
}

export const PREDEFINED_GROUPS = ['GROUP_1', 'GROUP_2'];
export const PREDEFINED_ROLES = ['ADMIN', 'PERSONAL', 'VIEWER'];
export const PREDEFINED_PERMISSIONS = ['CREATE', 'VIEW', 'EDIT', 'DELETE'];

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  {
    id: 2,
    name: 'Grabriel Monroe',
    roles: ['PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  { id: 3, name: 'Alex Xavier', roles: ['PERSONAL'], groups: ['GROUP_2'] },
  {
    id: 4,
    name: 'Jarvis Khan',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_2'],
  },
  {
    id: 5,
    name: 'Martines Polok',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
  {
    id: 6,
    name: 'Gabriela Wozniak',
    roles: ['VIEWER', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
];

export const ROLES: Role[] = [
  {
    name: 'Admin',
    code: 'ADMIN',
    permissions: ['CREATE', 'VIEW', 'EDIT', 'DELETE'],
  },
  { name: 'Personal', code: 'PERSONAL', permissions: [] },
  { name: 'Viewer', code: 'VIEWER', permissions: ['VIEW'] },
];
