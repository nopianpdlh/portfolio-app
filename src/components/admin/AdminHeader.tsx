"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Settings, Home } from "lucide-react"

interface AdminHeaderProps {
  user: {
    id: string
    email: string
    name?: string | null
    role: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email.substring(0, 2).toUpperCase()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/admin" className="text-xl font-bold">
            Admin Panel
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/projects"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Projects
            </Link>
            <Link
              href="/admin/skills"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Skills
            </Link>
            <Link
              href="/admin/experiences"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Experiences
            </Link>
            <Link
              href="/admin/blog"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Blog
            </Link>
            <Link
              href="/admin/contacts"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Contacts
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || "Admin"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
