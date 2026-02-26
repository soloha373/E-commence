'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Grid3x3,
  Layers,
  Database,
  Cloud,
  Shield,
  BarChart3,
  ArrowLeft,
  Settings,
  LucideIcon,
  Home,
  FileText,
  Zap,
} from 'lucide-react'

const navigationItems: Array<{
  name: string
  href: string
  icon: LucideIcon
  badge?: string
}> = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Architecture Builder', href: '/dashboard/architecture', icon: Grid3x3 },
  { name: 'Microservices', href: '/dashboard/microservices', icon: Layers },
  { name: 'Data Architecture', href: '/dashboard/data-architecture', icon: Database },
  { name: 'Sequence Flow', href: '/dashboard/sequence-flow', icon: Zap },
  { name: 'Cloud Deployment', href: '/dashboard/cloud-deployment', icon: Cloud },
  { name: 'Security', href: '/dashboard/security', icon: Shield },
  { name: 'Export', href: '/dashboard/export', icon: FileText },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-border/50 bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">ArchDesign</h2>
            <p className="text-xs text-sidebar-foreground/60">Academic Tool</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 justify-start"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3 px-4"
                  asChild
                >
                  <span>
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3"
          onClick={() => router.push('/dashboard/settings')}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
