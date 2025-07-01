import { type NpcStoreTypes as RealNpcStoreTypes } from "../npc/types";

export interface NpcStoreTypes {
  errors: Record<string, string>;
  image: string;
  name: string;
  region: string;
  type: string;
  description: string;
  goal: string;
  relation: string;
  rolls: {
    battle: string;
    intellect: string;
    craft: string;
    physical: string;
    social: string;
    custom: string;
  };
  customRollTitle: string;
  danger: string;
  features: string;
  triggers: string;
  checkDifficulty: number;
  checkFailure: string;
  extra: string;
}

export interface NpcStoreActionTypes {
  // TEMP
  getValues: () => RealNpcStoreTypes;
  // /TEMP

  createNpc: () => Promise<void>;

  reset: () => void;

  setFieldValue: (key: keyof NpcStoreTypes, value: any) => void;

  setImage: (value: string) => void;

  setName: (value: string) => void;

  setRegion: (region: string) => void;

  setType: (value: string) => void;

  setDescription: (value: string) => void;

  setGoal: (value: string) => void;

  setRelation: (value: string) => void;

  setRolls: (values: Partial<NpcStoreTypes['rolls']>) => void;

  setCustomRollTitle: (value: string) => void;

  setDanger: (value: string) => void;

  setFeatures: (value: string) => void;

  setTriggers: (value: string) => void;

  setCheckDifficulty: (value: number) => void;

  setCheckFailure: (value: string) => void;

  setExtra: (value: string) => void;
}