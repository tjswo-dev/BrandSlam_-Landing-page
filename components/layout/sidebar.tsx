'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ClipboardList,
  Wallet,
  BookOpen,
  HelpCircle,
  Trophy,
  LogOut,
  User,
  Sparkles,
  Users,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard',    label: '홈',             icon: LayoutDashboard },
  { href: '/influencers',  label: '인플루언서 리스트', icon: Users },
  { href: '/tasks',        label: '내 작업',          icon: ClipboardList },
  { href: '/settlement',   label: '정산 관리',        icon: Wallet },
  { href: '/guidelines',   label: '가이드라인',        icon: BookOpen },
  { href: '/faq',          label: 'FAQ',             icon: HelpCircle },
  { href: '/ranking',      label: '랭킹',             icon: Trophy },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <Link href="/" className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 transition-opacity hover:opacity-80">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold">SLAM GLOBAL</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
            <User className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">worker@example.com</p>
            <p className="text-xs text-sidebar-foreground/60">우수 작업자</p>
          </div>
        </div>
        <button className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </div>
    </aside>
  )
}
