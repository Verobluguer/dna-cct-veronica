import { CCEI_ITEMS } from './ccei'

export interface ScenarioPreset {
  id: string
  label: string
  description: string
  /** Items the app pre-checks as applicable. Student can adjust before scoring. */
  applicableItemIds: string[]
}

const ALL_ITEM_IDS = CCEI_ITEMS.map(i => i.id)

/** vSim guidance from CCEI 2.0: item 3 (Assesses the Environment) is "never applicable in vSim". */
const VIRTUAL_SIM_DEFAULT = ALL_ITEM_IDS.filter(id => id !== 'item-3')

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'sim-junior-asthma',
    label: 'SimJunior — Asthma',
    description: 'Pediatric asthma scenario on the SimJunior manikin.',
    applicableItemIds: ALL_ITEM_IDS,
  },
  {
    id: 'vsim-fundamentals',
    label: 'vSim Fundamentals',
    description: 'Virtual simulation, e.g. Jared Griffin or Josephine Morrow.',
    applicableItemIds: VIRTUAL_SIM_DEFAULT,
  },
  {
    id: 'vrclinicals',
    label: 'vrClinicals',
    description: 'VR-based clinical experience.',
    applicableItemIds: VIRTUAL_SIM_DEFAULT,
  },
  {
    id: 'real-clinical',
    label: 'Real clinical placement',
    description: 'Bedside or community experience under supervision.',
    applicableItemIds: ALL_ITEM_IDS,
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Pick the items you want to score yourself.',
    applicableItemIds: ALL_ITEM_IDS,
  },
]

export function findScenarioPreset(id: string): ScenarioPreset | undefined {
  return SCENARIO_PRESETS.find(s => s.id === id)
}
