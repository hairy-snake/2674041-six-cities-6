export function getLoginFormError(email: string, password: string): string | null {
  if (!email.trim() || !password) {
    return 'Введите email и пароль';
  }
  if (/\s/.test(password)) {
    return 'Пароль не должен содержать пробелов';
  }
  return null;
}
