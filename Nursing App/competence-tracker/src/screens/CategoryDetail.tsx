import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { CCEI_CATEGORIES, CCEI_ITEMS, CCEI_SUBSTEPS, type CategoryId } from '../data/ccei'
import { db } from '../lib/db'
import { summarizeItems } from '../lib/aggregations'
import { ItemRow } from '../components/ItemRow'
import './CategoryDetail.css'

export function CategoryDetail() {
  const { categoryId } = useParams<{ categoryId: CategoryId }>()
  const navigate = useNavigate()
  const category = CCEI_CATEGORIES.find(c => c.id === categoryId)

  const sittings   = useLiveQuery(() => db.sittings.toArray(), [])
  const itemScores = useLiveQuery(() => db.itemScores.toArray(), [])
  const isLoading  = sittings === undefined || itemScores === undefined
  const summaries  = !isLoading ? summarizeItems(sittings, itemScores) : new Map()

  if (!category) {
    return (
      <div className="cat-detail">
        <button type="button" className="cat-detail__back" onClick={() => navigate('/')}>
          ← Home
        </button>
        <p className="cat-detail__sub">Category not found.</p>
      </div>
    )
  }

  const itemsInCategory = CCEI_ITEMS.filter(i => i.categoryId === category.id)
  const substepsInCategory = CCEI_SUBSTEPS.filter(s => s.categoryId === category.id)
  const useSubsteps = substepsInCategory.length > 0  // only Clinical Judgment

  return (
    <div className="cat-detail">
      <button type="button" className="cat-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <header className="cat-detail__header">
        <h2 className="cat-detail__headline">{category.label}</h2>
        <p className="cat-detail__sub">{category.description}</p>
      </header>

      {useSubsteps ? (
        substepsInCategory.map(sub => {
          const items = itemsInCategory.filter(i => i.substepId === sub.id)
          return (
            <section key={sub.id} className="cat-detail__substep">
              <h3 className="cat-detail__substep-label">{sub.label}</h3>
              <p className="cat-detail__substep-desc">{sub.description}</p>
              <div className="cat-detail__items">
                {items.map(item => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    summary={summaries.get(item.id) ?? {
                      itemId: item.id, competence: null, recentScores: [],
                      lastScoredAt: null, attempts: 0,
                    }}
                  />
                ))}
              </div>
            </section>
          )
        })
      ) : (
        <section className="cat-detail__items">
          {itemsInCategory.map(item => (
            <ItemRow
              key={item.id}
              item={item}
              summary={summaries.get(item.id) ?? {
                itemId: item.id, competence: null, recentScores: [],
                lastScoredAt: null, attempts: 0,
              }}
            />
          ))}
        </section>
      )}
    </div>
  )
}
