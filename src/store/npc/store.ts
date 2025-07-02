import { create } from "zustand/react";
import { type NpcStoreTypes, type NpcStoreActionTypes, type NpcListItemType } from "./types";
import { toaster } from "@/components/ui/toaster";

export const useNpcStore = create<NpcStoreTypes & NpcStoreActionTypes>((set, get) => ({
  fetching: {
    list: false,
    npc: false,
    update: false,
  },
  errors: {
    list: false,
    npc: false,
    create: false,
    update: false,
    delete: false,
  },

  npcList: [],
  regionList: {},
  checkedRegion: '',
  setCheckedRegion: checkedRegion => {
    localStorage.setItem('checkedRegion', checkedRegion);
    set({ checkedRegion });
  },
  loadNpcList: async () => {
    const regions: Record<string, any[]> = {};

    try {
      const response = await fetch('https://f.etrin.ru/api/charlist/npclist');
      const list = await response.json();

      list.forEach((item: NpcListItemType) => {
        const region = item.region || 'Прочие';
        if (regions[region]) {
          regions[region].push(item);
          return;
        }
        regions[region] = [item];
      })

      set({
        npcList: list,
        regionList: regions,
      })
      const id = get().activeId || list[0]?.id || 0;
      await get().setActiveId(id);
    } finally {

    }
  },

  activeId: 0,
  setActiveId: async (activeId) => {
    if (get().activeId !== activeId) {
      set({ activeId });
      get().loadNpc(activeId);
      await localStorage.setItem('activeId', `${activeId}`);
    }
  },
  loadNpc: async (id: number) => {
    try {
      const response = await fetch(`https://f.etrin.ru/api/charlist/npc?id=${id}`);
      const char = await response.json();
      if (!char) return;

      set({
        id: char.id || 0,
        name: char.name || '',
        region: char.region || '',
        image: char.image || '',
        type: char.type || '',
        description: char.description || '',
        goal: char.goal || '',
        relation: char.relation || '',
        rolls: {
          ...char.rolls,
        },
        customRollTitle: char.customRollTitle || '',
        danger: char.danger || '',
        features: char.features || '',
        triggers: char.triggers || '',
        checkDifficulty: char.checkDifficulty || 0,
        checkFailure: char.checkFailure || '',
        extra: char.extra || '',
      });
    } finally {

    }
  },

  updateNpc: async () => {
    try {
      const params = {
        id: get().id,
        name: get().name || '',
        region: get().region || '',
        image: get().image || '',
        type: get().type || '',
        description: get().description || '',
        goal: get().goal || '',
        relation: get().relation || '',
        rolls: {
          ...get().rolls,
        },
        customRollTitle: get().customRollTitle || '',
        danger: get().danger || '',
        features: get().features || '',
        triggers: get().triggers || '',
        checkDifficulty: get().checkDifficulty || 0,
        checkFailure: get().checkFailure || '',
        extra: get().extra || '',
      };
      await fetch('https://f.etrin.ru/api/charlist/npc', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(params),
      });
      toaster.create({
        type: 'success',
        description: 'Сохранилось'
      });
    } finally {

    }

  },
  deleteNpc: async () => {
    try {
      await fetch(`https://f.etrin.ru/api/charlist/npc?id=${get().activeId}`, {
        method: 'DELETE',
      });
      toaster.create({
        type: 'success',
        description: 'Персонаж ушёл',
      });
    } finally {

    }
  },

  id: 0,
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

  goal: '',
  setGoal: goal => set({ goal }),

  relation: '',
  setRelation: relation => set({ relation }),

  rolls: {
    battle: 0,
    intellect: 0,
    craft: 0,
    physical: 0,
    social: 0,
    custom: 0,
  },
  setRoll: (key, value) => set(store => ({ rolls: { ...store.rolls, [key]: value } })),
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

  checkDifficulty: 0,
  setCheckDifficulty: checkDifficulty => set({ checkDifficulty }),
  checkFailure: '',
  setCheckFailure: checkFailure => set({ checkFailure }),

  extra: '',
  setExtra: extra => set({ extra }),
}));
