import { useNavigate } from 'react-router-dom'
import type { CceiItem } from '../data/ccei'
import { formatPercent, type ItemSummary } from '../lib/aggregations'
import { ItemHistoryDots } from './ItemHistoryDots'
import './ItemRow.css'

interface Props {
  item: CceiItem
  summary: ItemSummary
}

export function ItemRow({ item, summary }: Props) {
  const navigate = useNavigate()
  const hasData = summary.competence !== null
  return (
    <button
      type="button"
      className="item-row"
      onClick={() => navigate(`/item/${item.id}`)}
    >
      <span className="item-row__lead">
        <span className="item-row__num">{item.number}</span>
        <span className="item-row__title">{item.title}</span>
      </span>
      <span className="item-row__trail">
        <ItemHistoryDots scores={summary.recentScores} />
        <span className={`item-row__pct${hasData ? '' : ' item-row__pct--empty'}`}>
          {formatPercent(summary.competence)}
        </span>
        <span className="item-row__chevron" aria-hidden="true">›</span>
      </span>
    </button>
  )
}
