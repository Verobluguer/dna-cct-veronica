import type { Score } from '../lib/db'
import './ItemHistoryDots.css'

interface Props {
  scores: Score[]   // oldest → newest, NA already excluded
  capacity?: number // pad with empty slots up to this many
}

export function ItemHistoryDots({ scores, capacity = 5 }: Props) {
  const padCount = Math.max(0, capacity - scores.length)
  const summary = scores.length === 0
    ? 'No attempts yet'
    : `${scores.filter(s => s === 1).length} of ${scores.length} recent attempts met threshold`

  return (
    <span
      className="dots"
      role="img"
      aria-label={summary}
    >
      {Array.from({ length: padCount }).map((_, i) => (
        <span key={`p${i}`} className="dots__dot dots__dot--empty" aria-hidden="true" />
      ))}
      {scores.map((s, i) => (
        <span
          key={i}
          className={`dots__dot dots__dot--${s === 1 ? 'pass' : 'miss'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
