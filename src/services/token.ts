const AUTH_TOKEN_KEY = 'six-cities-token';

export function getToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
}

export function saveToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function dropToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
