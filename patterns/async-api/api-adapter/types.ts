export type ApiUser = {
  id: number;
  email_address: string;
  profile: {
    name: string;
    department_name: string;
    avatar_url?: string;
  };
  flags: {
    is_blocked: boolean;
    email_verified: boolean;
  };
  created_at: string;
};

export type UserViewModel = {
  id: string;
  displayName: string;
  email: string;
  department: string;
  statusLabel: string;
  statusTone: 'green' | 'yellow' | 'red';
  joinedAtLabel: string;
};
