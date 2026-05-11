import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../lib/db'
import { summarizeCategories } from '../lib/aggregations'
import { CategoryTile } from '../components/CategoryTile'
import { clearAllData, seedDemoData } from '../lib/sampleData'
import './Home.css'

export function Home() {
  const navigate = useNavigate()
  const sittings    = useLiveQuery(() => db.sittings.toArray(), [])
  const itemScores  = useLiveQuery(() => db.itemScores.toArray(), [])
  const isLoading   = sittings === undefined || itemScores === undefined
  const summaries   = !isLoading ? summarizeCategories(sittings, itemScores) : []
  const sittingsCount = sittings?.length ?? 0

  return (
    <div className="home">
      <section className="home__intro">
        <p className="home__greeting">Welcome back</p>
        <h2 className="home__headline">Your competence at a glance</h2>
        <p className="home__sub">
          {sittingsCount === 0
            ? 'Log your first sitting from the Add tab to see your progress here.'
            : `${sittingsCount} sitting${sittingsCount === 1 ? '' : 's'} logged so far.`}
        </p>
      </section>

      {!isLoading && (
        <section className="home__tiles" aria-label="Competence by category">
          {summaries.map(s => (
            <CategoryTile
              key={s.categoryId}
              summary={s}
              onClick={() => navigate(`/category/${s.categoryId}`)}
            />
          ))}
        </section>
      )}

      <section className="home__dev" aria-label="Dev tools">
        <p className="home__dev-label">Dev tools</p>
        <div className="home__dev-actions">
          <button type="button" className="home__dev-btn" onClick={() => seedDemoData()}>
            Seed demo data
          </button>
          <button type="button" className="home__dev-btn home__dev-btn--ghost" onClick={() => clearAllData()}>
            Clear all
          </button>
        </div>
      </section>
    </div>
  )
}
