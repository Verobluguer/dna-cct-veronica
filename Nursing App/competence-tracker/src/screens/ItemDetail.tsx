import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { CCEI_CATEGORIES, CCEI_ITEMS, CCEI_SUBSTEPS } from '../data/ccei'
import { db, type Score } from '../lib/db'
import {
  formatPercent,
  formatRelativeDate,
  listItemAttempts,
  summarizeItems,
} from '../lib/aggregations'
import { ItemHistoryDots } from '../components/ItemHistoryDots'
import './ItemDetail.css'

function scoreLabel(score: Score): string {
  if (score === 1) return 'Met threshold'
  if (score === 0) return 'Below threshold'
  return 'Not applicable'
}

function scoreClass(score: Score): string {
  if (score === 1) return 'pass'
  if (score === 0) return 'miss'
  return 'na'
}

export function ItemDetail() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const item = CCEI_ITEMS.find(i => i.id === itemId)

  const sittings   = useLiveQuery(() => db.sittings.toArray(), [])
  const itemScores = useLiveQuery(() => db.itemScores.toArray(), [])
  const isLoading  = sittings === undefined || itemScores === undefined

  if (!item) {
    return (
      <div className="item-detail">
        <button type="button" className="item-detail__back" onClick={() => navigate('/')}>
          ← Home
        </button>
        <p className="item-detail__sub">Item not found.</p>
      </div>
    )
  }

  const category = CCEI_CATEGORIES.find(c => c.id === item.categoryId)
  const substep  = item.substepId ? CCEI_SUBSTEPS.find(s => s.id === item.substepId) : null

  const summary = !isLoading
    ? summarizeItems(sittings, itemScores).get(item.id)
    : undefined
  const attempts = !isLoading ? listItemAttempts(item.id, sittings, itemScores) : []

  return (
    <div className="item-detail">
      <button type="button" className="item-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <header className="item-detail__header">
        <p className="item-detail__breadcrumb">
          {category?.label}{substep ? ` · ${substep.label}` : ''}
        </p>
        <h2 className="item-detail__headline">
          <span className="item-detail__num">{item.number}</span>
          {item.title}
        </h2>
      </header>

      <section className="item-detail__stats" aria-label="Performance summary">
        <div className="item-detail__stat">
          <span className="item-detail__stat-label">Competence</span>
          <span className="item-detail__stat-value">
            {formatPercent(summary?.competence ?? null)}
          </span>
        </div>
        <div className="item-detail__stat">
          <span className="item-detail__stat-label">Attempts</span>
          <span className="item-detail__stat-value">{summary?.attempts ?? 0}</span>
        </div>
        <div className="item-detail__stat">
          <span className="item-detail__stat-label">Recent</span>
          <ItemHistoryDots scores={summary?.recentScores ?? []} />
        </div>
      </section>

      <section className="item-detail__section">
        <h3 className="item-detail__section-title">What this measures</h3>
        <p className="item-detail__body">{item.description}</p>
      </section>

      {item.examples.length > 0 && (
        <section className="item-detail__section">
          <h3 className="item-detail__section-title">Examples</h3>
          {item.examples.map((ex, i) => (
            <pre key={i} className="item-detail__example">{ex}</pre>
          ))}
        </section>
      )}

      <section className="item-detail__section">
        <h3 className="item-detail__section-title">History</h3>
        {attempts.length === 0 ? (
          <p className="item-detail__empty">No sittings yet for this item.</p>
        ) : (
          <ul className="item-detail__history">
            {attempts.map((a, i) => (
              <li key={i} className={`attempt attempt--${scoreClass(a.score)}`}>
                <div className="attempt__top">
                  <span className="attempt__date">{formatRelativeDate(a.dateTime)}</span>
                  <span className="attempt__scenario">{a.scenarioLabel}</span>
                </div>
                <div className="attempt__bottom">
                  <span className={`attempt__score attempt__score--${scoreClass(a.score)}`}>
                    {scoreLabel(a.score)}
                  </span>
                  {a.note && <p className="attempt__note">{a.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
