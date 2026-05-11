import { CCEI_CATEGORIES, CCEI_ITEMS, type CategoryId } from '../data/ccei'
import type { ItemScore, Score, Sitting } from './db'

export interface ItemSummary {
  itemId: string
  /** Recent competence: 1s / (1s + 0s). null if no data. */
  competence: number | null
  /** Most recent N raw scores (oldest → newest), excluding NA. */
  recentScores: Score[]
  /** When the item was last scored (any score). */
  lastScoredAt: string | null
  /** Number of total non-NA scores. */
  attempts: number
}

export interface ItemAttempt {
  sittingId: number
  dateTime: string
  scenarioLabel: string
  score: Score
  note?: string
}

export interface CategorySummary {
  categoryId: CategoryId
  label: string
  /** Recent competence: (# of 1s) / (# of 1s + # of 0s) across all sittings, in [0,1]. null if no data. */
  competence: number | null
  /** Total number of scored data points (excluding NA) for this category. */
  scoredCount: number
  /** Number of items in the category that have at least one non-NA score. */
  itemsWithData: number
  /** Total items in the category. */
  itemsTotal: number
  /** Per-sitting competence for the trend sparkline, oldest → newest. */
  trend: number[]
}

const ITEMS_BY_CATEGORY: Record<CategoryId, string[]> = (() => {
  const map: Record<CategoryId, string[]> = {
    'clinical-judgment': [],
    'communication': [],
    'quality-safety': [],
    'professionalism': [],
  }
  for (const item of CCEI_ITEMS) map[item.categoryId].push(item.id)
  return map
})()

const ITEM_TO_CATEGORY: Record<string, CategoryId> = (() => {
  const map: Record<string, CategoryId> = {}
  for (const item of CCEI_ITEMS) map[item.id] = item.categoryId
  return map
})()

/** Compute one-number competence for a list of scores (ignores NA). null if no 0/1 scores. */
function competenceFromScores(scores: Array<0 | 1 | 'NA'>): number | null {
  let pos = 0
  let total = 0
  for (const s of scores) {
    if (s === 'NA') continue
    total++
    if (s === 1) pos++
  }
  return total === 0 ? null : pos / total
}

export function summarizeCategories(
  sittings: Sitting[],
  itemScores: ItemScore[],
): CategorySummary[] {
  // Sittings sorted oldest → newest for trend
  const sortedSittings = [...sittings].sort((a, b) => a.dateTime.localeCompare(b.dateTime))
  const scoresBySitting = new Map<number, ItemScore[]>()
  for (const score of itemScores) {
    if (score.sittingId == null) continue
    const list = scoresBySitting.get(score.sittingId) ?? []
    list.push(score)
    scoresBySitting.set(score.sittingId, list)
  }

  return CCEI_CATEGORIES.map(cat => {
    const itemIds = new Set(ITEMS_BY_CATEGORY[cat.id])
    const allCatScores = itemScores.filter(s => ITEM_TO_CATEGORY[s.itemId] === cat.id)
    const competence = competenceFromScores(allCatScores.map(s => s.score))

    const scoredCount = allCatScores.filter(s => s.score !== 'NA').length
    const itemsWithData = new Set(
      allCatScores.filter(s => s.score !== 'NA').map(s => s.itemId)
    ).size

    const trend: number[] = []
    for (const sit of sortedSittings) {
      if (sit.id == null) continue
      const sScores = (scoresBySitting.get(sit.id) ?? []).filter(s => itemIds.has(s.itemId))
      const c = competenceFromScores(sScores.map(s => s.score))
      if (c !== null) trend.push(c)
    }

    return {
      categoryId: cat.id,
      label: cat.label,
      competence,
      scoredCount,
      itemsWithData,
      itemsTotal: itemIds.size,
      trend,
    }
  })
}

export function summarizeItems(
  sittings: Sitting[],
  itemScores: ItemScore[],
  recentLimit = 5,
): Map<string, ItemSummary> {
  const sittingById = new Map<number, Sitting>()
  for (const s of sittings) if (s.id != null) sittingById.set(s.id, s)

  const byItem = new Map<string, ItemScore[]>()
  for (const s of itemScores) {
    const list = byItem.get(s.itemId) ?? []
    list.push(s)
    byItem.set(s.itemId, list)
  }

  const result = new Map<string, ItemSummary>()
  for (const item of CCEI_ITEMS) {
    const all = byItem.get(item.id) ?? []
    const withSitting = all
      .map(s => {
        const sit = s.sittingId != null ? sittingById.get(s.sittingId) : undefined
        return sit ? { score: s.score, dateTime: sit.dateTime } : null
      })
      .filter((x): x is { score: Score; dateTime: string } => x !== null)
      .sort((a, b) => a.dateTime.localeCompare(b.dateTime))

    const nonNa = withSitting.filter(x => x.score !== 'NA')
    const lastScoredAt = withSitting.length ? withSitting[withSitting.length - 1].dateTime : null
    const competence = competenceFromScores(nonNa.map(x => x.score))
    const recentScores = nonNa.slice(-recentLimit).map(x => x.score)

    result.set(item.id, {
      itemId: item.id,
      competence,
      recentScores,
      lastScoredAt,
      attempts: nonNa.length,
    })
  }
  return result
}

export function listItemAttempts(
  itemId: string,
  sittings: Sitting[],
  itemScores: ItemScore[],
): ItemAttempt[] {
  const sittingById = new Map<number, Sitting>()
  for (const s of sittings) if (s.id != null) sittingById.set(s.id, s)

  const out: ItemAttempt[] = []
  for (const s of itemScores) {
    if (s.itemId !== itemId || s.sittingId == null) continue
    const sit = sittingById.get(s.sittingId)
    if (!sit) continue
    const attempt: ItemAttempt = {
      sittingId: s.sittingId,
      dateTime: sit.dateTime,
      scenarioLabel: sit.scenarioLabel,
      score: s.score,
    }
    if (s.note !== undefined) attempt.note = s.note
    out.push(attempt)
  }
  return out.sort((a, b) => b.dateTime.localeCompare(a.dateTime))
}

export function formatPercent(value: number | null): string {
  if (value === null) return '—'
  return `${Math.round(value * 100)}%`
}

export function formatRelativeDate(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diffMs = now - then
  const day = 1000 * 60 * 60 * 24
  if (diffMs < day) return 'today'
  const days = Math.floor(diffMs / day)
  if (days === 1) return 'yesterday'
  if (days < 7)  return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} wk ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
