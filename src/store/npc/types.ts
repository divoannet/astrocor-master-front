import type { Group, TreeGroupItem } from "@/components/NpcList/db/types";

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
  groupId: number,
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
  npcList: NpcStoreTypes[],
  regionList: Record<string, any[]>,
  groups: TreeGroupItem[],
  groupList: Group[],
  checkedRegion: string;
  activeId: null | number,

  loadNpcList: () => Promise<void>,
  addFolder: (parentId: number | null) => Promise<void>,
  updateFolder: (group: Partial<TreeGroupItem>) => Promise<void>,
  removeFolder: (id: number) => Promise<void>,
  moveFolder: (id: number, parentId: number) => Promise<void>,
  toggleFolder: (id: number, open?: boolean) => void;
  setCheckedRegion: (value: string) => void,
  setActiveId: (activeId: number | null) => Promise<void>,
  loadNpc: (id: number) => Promise<void>,
  updateNpc: () => Promise<void>,
  deleteNpc: () => Promise<void>,
  setImage: (value: string) => void,
  setName: (value: string) => void,
  setRegion: (region: string) => void,
  getRegion: () => string,
  setGroupId: (groupId: number) => void,
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