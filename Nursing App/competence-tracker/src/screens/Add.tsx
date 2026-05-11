import './Add.css'

export function Add() {
  return (
    <div className="add">
      <section className="add__hero">
        <h2 className="add__headline">Log a new sitting</h2>
        <p className="add__sub">
          Pick a scenario, tick the items that applied, score 0 or 1, and add a note where it helps.
        </p>
      </section>

      <section className="add__sources" aria-label="Input sources">
        <button type="button" className="add__source-btn add__source-btn--primary">
          <span className="add__source-title">Manual self-score</span>
          <span className="add__source-sub">Most flexible — works for any sim or real placement</span>
        </button>
        <button type="button" className="add__source-btn">
          <span className="add__source-title">Scan QR from virtual sim</span>
          <span className="add__source-sub">Auto-fill from vSim / vrClinicals export</span>
        </button>
        <button type="button" className="add__source-btn">
          <span className="add__source-title">Upload a results file</span>
          <span className="add__source-sub">Drop a .json export from your simulation</span>
        </button>
      </section>
    </div>
  )
}
