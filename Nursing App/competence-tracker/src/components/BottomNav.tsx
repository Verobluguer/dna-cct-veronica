import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import './BottomNav.css'

type Tab = {
  to: string
  label: string
  icon: (active: boolean) => ReactElement
}

const tabs: Tab[] = [
  { to: '/',       label: 'Home',  icon: HomeIcon  },
  { to: '/coach',  label: 'Coach', icon: CoachIcon },
  { to: '/add',    label: 'Add',   icon: AddIcon   },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `bottom-nav__tab${isActive ? ' bottom-nav__tab--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav__icon">{tab.icon(isActive)}</span>
              <span className="bottom-nav__label">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function HomeIcon(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function CoachIcon(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1.2 3.5A7.96 7.96 0 0 1 21 12Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="9"  cy="12" r="1" fill="currentColor" />
      <circle cx="13" cy="12" r="1" fill="currentColor" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

function AddIcon(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill={active ? 'currentColor' : 'none'} />
      <path d="M12 8v8M8 12h8"
        stroke={active ? 'var(--color-bg)' : 'currentColor'}
        strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
