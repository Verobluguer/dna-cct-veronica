import Dexie, { type Table } from 'dexie'

export type Score = 0 | 1 | 'NA'

export interface Sitting {
  id?: number
  dateTime: string         // ISO 8601
  scenarioId: string
  scenarioLabel: string
  source: 'self' | 'qr' | 'upload'
  sessionNote?: string
}

export interface ItemScore {
  id?: number
  sittingId: number
  itemId: string           // e.g. 'item-12'
  score: Score
  note?: string
}

class CompetenceTrackerDB extends Dexie {
  sittings!: Table<Sitting, number>
  itemScores!: Table<ItemScore, number>

  constructor() {
    super('CompetenceTracker')
    this.version(1).stores({
      sittings:   '++id, dateTime, scenarioId',
      itemScores: '++id, sittingId, itemId, [sittingId+itemId]',
    })
  }
}

export const db = new CompetenceTrackerDB()
