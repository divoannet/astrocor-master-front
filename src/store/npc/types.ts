export type NpcListItemType = {
  name: string,
  id: number,
  image: string,
  region: string,
};

export interface NpcStoreTypes {
  id: number;
  image: string;
  name: string,
  region: string,
  type: string,
  description: string,
  goal: string,
  relation: string,
  rolls: {
    battle: number,
    intellect: number,
    craft: number,
    physical: number,
    social: number,
    custom: number,
  },
  customRollTitle: string,
  danger: string,
  features: string,
  triggers: string,
  checkDifficulty: number,
  checkFailure: string,
  extra: string,
}

export interface NpcStoreActionTypes {
  npcList: NpcListItemType[],
  regionList: Record<string, any[]>,
  checkedRegion: string;
  activeId: null | number,

  loadNpcList: () => Promise<void>,
  setCheckedRegion: (value: string) => void,
  setActiveId: (activeId: number | null) => Promise<void>,
  loadNpc: (id: number) => Promise<void>,
  updateNpc: () => Promise<void>,
  deleteNpc: () => Promise<void>,
  setImage: (value: string) => void,
  setName: (value: string) => void,
  setRegion: (region: string) => void,
  setType: (value: string) => void,
  setDescription: (value: string) => void,
  setGoal: (value: string) => void,
  setRelation: (value: string) => void,
  setRoll: (key: keyof NpcStoreTypes['rolls'], value: number) => void,
  setRolls: (values: Partial<NpcStoreTypes['rolls']>) => void;
  setCustomRollTitle: (value: string) => void,
  setDanger: (value: string) => void,
  setFeatures: (value: string) => void,
  setTriggers: (value: string) => void,
  setCheckDifficulty: (value: number) => void,
  setCheckFailure: (value: string) => void,
  setExtra: (value: string) => void,
}