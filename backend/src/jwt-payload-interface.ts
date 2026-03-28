export interface JwtPayload {
  id: string;
  fullName: string;
  sessionId: `${string}-${string}-${string}-${string}-${string}`;
  login: string;
  role: 'user' | 'gl_admin' | 'sad_admin' | 'staff';
  groupId: string;
  date: number;
}
