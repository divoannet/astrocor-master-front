export interface NpcStoreTypes {
  fetching: {
    list: boolean,
    npc: boolean,
    update: boolean,
  },
  errors: {
    list: boolean,
    npc: boolean,
    create: boolean,
    update: boolean,
    delete: boolean,
  },

  npcList: {
    name: string,
    id: number,
    image: string,
    region: string,
  }[],
  loadNpcList: () => Promise<void>,
  regionList: Record<string, any[]>,
  checkedRegion: string;
  setCheckedRegion: (value: string) => void,

  activeId: number,
  setActiveId: (activeId: number) => void,
  loadNpc: (id: number) => Promise<void>,

  createNpc: () => Promise<void>,
  updateNpc: () => Promise<void>,
  deleteNpc: () => Promise<void>,

  id: number;

  image: string;
  setImage: (value: string) => void,

  name: string,
  setName: (value: string) => void,

  region: string,
  setRegion: (region: string) => void,

  type: string,
  setType: (value: string) => void,

  description: string,
  setDescription: (value: string) => void,

  goal: string,
  setGoal: (value: string) => void,

  relation: string,
  setRelation: (value: string) => void,

  rolls: {
    battle: number,
    intellect: number,
    craft: number,
    physical: number,
    social: number,
    custom: number,
  },
  setRoll: (key: keyof NpcStoreTypes['rolls'], value: number) => void,
  setRolls: (values: Partial<NpcStoreTypes['rolls']>) => void;

  customRollTitle: string,
  setCustomRollTitle: (value: string) => void,

  danger: string,
  setDanger: (value: string) => void,

  features: string,
  setFeatures: (value: string) => void,

  triggers: string,
  setTriggers: (value: string) => void,

  checkDifficulty: number,
  setCheckDifficulty: (value: number) => void,

  checkFailure: string,
  setCheckFailure: (value: string) => void,

  extra: string,
  setExtra: (value: string) => void,
}