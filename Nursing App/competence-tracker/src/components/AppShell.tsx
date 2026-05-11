import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { BottomNav } from './BottomNav'
import './AppShell.css'

function titleFor(pathname: string): string {
  if (pathname === '/coach') return 'Coach'
  if (pathname === '/add') return 'Add a sitting'
  if (pathname.startsWith('/category/')) return 'Category'
  if (pathname.startsWith('/item/')) return 'Item detail'
  return 'Competence Tracker'
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const title = titleFor(pathname)
  return (
    <div className="app-shell">
      <AppHeader title={title} />
      <main className="app-main">{children}</main>
      <BottomNav />
    </div>
  )
}
