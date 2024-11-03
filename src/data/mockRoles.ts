import { Role } from '../types';

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with ability to manage users, roles, and system settings',
    capabilities: [
      'Manage users and permissions',
      'Create and manage teams',
      'Configure system settings',
      'Access all leads and analytics',
      'Manage role definitions',
      'Export system data'
    ],
    color: 'purple'
  },
  {
    id: '2',
    name: 'Sales Manager',
    description: 'Team management and oversight of all sales activities',
    capabilities: [
      'View and manage team members',
      'Access team analytics',
      'Manage leads and opportunities',
      'Create and edit sales reports',
      'Set team targets',
      'View team performance metrics'
    ],
    color: 'blue'
  },
  {
    id: '3',
    name: 'Sales Executive',
    description: 'Handle individual sales activities and lead management',
    capabilities: [
      'Create and manage leads',
      'Update lead status',
      'Contact management',
      'Basic reporting',
      'View personal analytics',
      'Email verification'
    ],
    color: 'green'
  }
];