'use client'

import { Sidebar } from './sidebar'
import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border/50 bg-background px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="인플루언서 검색..." 
                className="w-80 border-border/50 bg-muted/50 pl-9 focus:bg-background"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative border-border/50">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0 text-xs text-white">
                3
              </Badge>
            </Button>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
