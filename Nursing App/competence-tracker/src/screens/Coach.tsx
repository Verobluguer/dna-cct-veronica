import './Coach.css'

export function Coach() {
  return (
    <div className="coach">
      <section className="coach__hero">
        <h2 className="coach__headline">Your AI coach</h2>
        <p className="coach__sub">
          Insights from your recent sittings and a chat grounded in the CCEI rubric will live here.
        </p>
      </section>

      <section className="coach__placeholder" aria-label="Coach placeholder">
        <div className="coach__bubble coach__bubble--ai">
          Hi! Once you log a few sittings I’ll be able to suggest where to focus next.
        </div>
        <div className="coach__bubble coach__bubble--user">
          (your messages will appear here)
        </div>
      </section>
    </div>
  )
}
