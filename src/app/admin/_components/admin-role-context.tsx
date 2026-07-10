"use client";

import * as React from "react";

type AdminRole = "admin" | "editor" | "viewer";

const AdminRoleContext = React.createContext<{
  role: AdminRole;
  canEdit: boolean;
  canCreate: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  isReadOnly: boolean;
}>({
  role: "viewer",
  canEdit: false,
  canCreate: false,
  canDelete: false,
  canManageUsers: false,
  canManageSettings: false,
  isReadOnly: true,
});

export function AdminRoleProvider({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const r = (["admin", "editor", "viewer"].includes(role) ? role : "viewer") as AdminRole;
  const value = React.useMemo(
    () => ({
      role: r,
      canEdit: r === "admin" || r === "editor",
      canCreate: r === "admin" || r === "editor",
      canDelete: r === "admin",
      canManageUsers: r === "admin",
      canManageSettings: r === "admin",
      isReadOnly: r === "viewer",
    }),
    [r]
  );
  return <AdminRoleContext.Provider value={value}>{children}</AdminRoleContext.Provider>;
}

export function useAdminRole() {
  return React.useContext(AdminRoleContext);
}
