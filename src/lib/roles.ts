// Role helper — centralizes all permission checks
export type Role = "admin" | "editor" | "viewer";

export function canCreate(role: string): boolean {
  return role === "admin" || role === "editor";
}

export function canEdit(role: string): boolean {
  return role === "admin" || role === "editor";
}

export function canDelete(role: string): boolean {
  return role === "admin";
}

export function canManageUsers(role: string): boolean {
  return role === "admin";
}

export function canManageSettings(role: string): boolean {
  return role === "admin";
}

export function isReadOnly(role: string): boolean {
  return role === "viewer";
}
