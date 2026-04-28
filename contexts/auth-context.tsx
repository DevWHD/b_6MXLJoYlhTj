"use client"

import React, { createContext, useContext, useState } from "react"

export type UserRole = "Admin" | "Médico" | "Enfermagem" | "Administrativo"

export interface User {
  id: string
  name: string
  role: UserRole
  sector: string
  avatar: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User
  setUser: (user: User) => void
}

const DEFAULT_USER: User = {
  id: "u1",
  name: "Dra. Maria Oliveira",
  role: "Médico",
  sector: "Obstetrícia",
  avatar: "MO",
  email: "maria.oliveira@maternidade.org",
  phone: "(11) 99999-0001",
}

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  setUser: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(DEFAULT_USER)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
