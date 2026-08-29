export interface AuthUser {
  userId: string;
  displayName: string;
  email: string;
  token: string;
  expiresOn: string;
  roles: string[];
}

export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
