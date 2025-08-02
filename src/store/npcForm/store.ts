import { create } from "zustand/react";
import { type NpcStoreTypes, type NpcStoreActionTypes } from "./types";
import { type NpcStoreTypes as RealNpcStoreTypes } from "../npc/types";
import { toaster } from "@/components/ui/toaster";
import { saveNpc } from "@/components/NpcList/db";

const initialForm: NpcStoreTypes = {
  errors: {},
  image: '',
  name: '',
  region: 'Эрдофольд',
  type: '',
  description: '',
  groupId: 0,
  goal: '',
  relation: '',
  rolls: {
    battle: '0',
    intellect: '0',
    craft: '0',
    physical: '0',
    social: '0',
    custom: '0',
  },
  customRollTitle: 'Особые',
  danger: '',
  features: '',
  triggers: '',
  checkDifficulty: 3,
  checkFailure: '',
  extra: '',
};

export const useNpcFormStore = create<NpcStoreTypes & NpcStoreActionTypes>((set, get) => ({
  getValues: () => {
    const values: Omit<RealNpcStoreTypes, 'id'> = {
      image: get().image,
      name: get().name,
      region: get().region,
      type: get().type,
      description: get().description,
      goal: get().goal,
      groupId: get().groupId,
      relation: get().relation,
      rolls: {
        battle: +get().rolls.battle,
        intellect: +get().rolls.intellect,
        craft: +get().rolls.craft,
        physical: +get().rolls.physical,
        social: +get().rolls.social,
        custom: +get().rolls.custom,
      },
      customRollTitle: get().customRollTitle,
      danger: get().danger,
      features: get().features,
      triggers: get().triggers,
      checkDifficulty: get().checkDifficulty,
      checkFailure: get().checkFailure,
      extra: get().extra,
    };
    return values;
  },

  errors: {},

  createNpc: async () => {
    const params = get().getValues();
    try {
      await saveNpc(params);
      set({ errors: {} })
      toaster.create({
        type: 'success',
        description: 'Сохранилось'
      });
    } catch (e: any) {
      toaster.create({
        type: 'error',
        description: 'Не сохранилось'
      });
      set({ errors: { save: e.error } })
    }
  },

  reset: () => set({ ...initialForm, region: get().region }),

  setFieldValue: (key, value) => set({ [key]: value }),

  image: '',
  setImage: image => set({ image }),

  name: '',
  setName: name => set({ name }),

  region: 'Эрдофольд',
  setRegion: region => set({ region }),

  type: '',
  setType: type => set({ type }),

  description: '',
  setDescription: description => set({ description }),

  groupId: 0,
  setGroupId: groupId => set({ groupId }),

  goal: '',
  setGoal: goal => set({ goal }),

  relation: '',
  setRelation: relation => set({ relation }),

  rolls: {
    battle: '0',
    intellect: '0',
    craft: '0',
    physical: '0',
    social: '0',
    custom: '0',
  },

  setRolls: values => set(store => ({
    rolls: {
      ...store.rolls,
      ...values,
    }
  })),

  customRollTitle: 'Особые',
  setCustomRollTitle: customRollTitle => set({ customRollTitle }),

  danger: '',
  setDanger: danger => set({ danger }),

  features: '',
  setFeatures: features => set({ features }),

  triggers: '',
  setTriggers: triggers => set({ triggers }),

  checkDifficulty: 3,
  setCheckDifficulty: checkDifficulty => set({ checkDifficulty }),

  checkFailure: '',
  setCheckFailure: checkFailure => set({ checkFailure }),

  extra: '',
  setExtra: extra => set({ extra }),
}));
