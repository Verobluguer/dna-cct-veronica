import { Sparkline } from './Sparkline'
import { formatPercent, type CategorySummary } from '../lib/aggregations'
import './CategoryTile.css'

interface Props {
  summary: CategorySummary
  onClick?: () => void
}

export function CategoryTile({ summary, onClick }: Props) {
  const hasData = summary.competence !== null
  return (
    <button
      type="button"
      className="category-tile"
      onClick={onClick}
      aria-label={`${summary.label} — ${hasData ? formatPercent(summary.competence) : 'no data yet'}`}
    >
      <div className="category-tile__header">
        <span className="category-tile__label">{summary.label}</span>
        <span className="category-tile__chevron" aria-hidden="true">›</span>
      </div>

      <div className="category-tile__body">
        <span className={`category-tile__pct${hasData ? '' : ' category-tile__pct--empty'}`}>
          {formatPercent(summary.competence)}
        </span>
        <Sparkline values={summary.trend} className="category-tile__spark" />
      </div>

      <div className="category-tile__footer">
        <span className="category-tile__meta">
          {summary.itemsWithData} of {summary.itemsTotal} items scored
        </span>
      </div>
    </button>
  )
}
