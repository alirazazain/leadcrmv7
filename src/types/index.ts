export interface User {
  id: string;
  email: string;
  password?: string;
  role: string;
  name: string;
  description?: string;
}

export interface Person {
  id: string;
  name: string;
  email: string | string[];
  designation: string;
  phoneNumbers?: string[];
  linkedin?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  color: string;
}