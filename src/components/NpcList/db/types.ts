export interface Rolls {
  battle: number;
  intellect: number;
  craft: number;
  physical: number;
  social: number;
  custom: number;
}

export interface NPC {
  id: number;
  name: string;
  description: string;
  image: string;
  region: string;
  goal: string;
  groupId: number;
  relation: string;
  customRollTitle: string;
  danger: string;
  features: string;
  triggers: string;
  checkDifficulty: number;
  checkFailure: string;
  extra: string;
  rolls: Rolls;
}

export interface NPCListItem {
  id: number;
  name: string;
  image: string;
  region: string;
  groupId: number;
}

export interface Group {
  id: number;
  name: string;
  parentId: number | null;
  sortOrder: number;
  open: boolean;
}

export interface TreeGroupItem extends Group {
  childern: TreeGroupItem[];
}

export interface RootTreeGroupItem extends Omit<TreeGroupItem, 'id'> { id: number | null };
