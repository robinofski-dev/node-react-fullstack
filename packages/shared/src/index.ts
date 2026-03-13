export interface User {
  id: string;
  login: string;
  displayName: string;
  avatarUrl: string;
}

export interface AuthStatus {
  authenticated: boolean;
  user?: User;
}
