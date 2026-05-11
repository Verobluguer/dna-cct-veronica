/** Dev-only helpers for seeding/clearing demo sittings on the device. */

import { CCEI_ITEMS } from '../data/ccei'
import { SCENARIO_PRESETS } from '../data/scenarios'
import { db, type Score } from './db'

const ITEM_IDS = CCEI_ITEMS.map(i => i.id)

function pickScore(quality: number): Score {
  // quality in [0,1]: probability of scoring 1 if not NA.
  const naRate = 0.05
  if (Math.random() < naRate) return 'NA'
  return Math.random() < quality ? 1 : 0
}

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

/** Insert 6 fake sittings showing improvement over time. Idempotent: clears first. */
export async function seedDemoData() {
  await db.itemScores.clear()
  await db.sittings.clear()

  const samples: Array<{ daysAgo: number; preset: string; quality: number }> = [
    { daysAgo: 28, preset: 'sim-junior-asthma', quality: 0.45 },
    { daysAgo: 21, preset: 'vsim-fundamentals', quality: 0.55 },
    { daysAgo: 14, preset: 'real-clinical',     quality: 0.62 },
    { daysAgo:  9, preset: 'vrclinicals',       quality: 0.68 },
    { daysAgo:  4, preset: 'vsim-fundamentals', quality: 0.78 },
    { daysAgo:  1, preset: 'real-clinical',     quality: 0.82 },
  ]

  for (const s of samples) {
    const preset = SCENARIO_PRESETS.find(p => p.id === s.preset)!
    const sittingId = await db.sittings.add({
      dateTime: daysAgo(s.daysAgo),
      scenarioId: preset.id,
      scenarioLabel: preset.label,
      source: 'self',
    })
    const applicable = new Set(preset.applicableItemIds)
    const rows = ITEM_IDS.map(itemId => ({
      sittingId,
      itemId,
      score: applicable.has(itemId) ? pickScore(s.quality) : ('NA' as Score),
    }))
    await db.itemScores.bulkAdd(rows)
  }
}

export async function clearAllData() {
  await db.itemScores.clear()
  await db.sittings.clear()
}
