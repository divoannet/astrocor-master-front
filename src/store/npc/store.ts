import { create } from "zustand/react";
import { type NpcStoreTypes } from "./types";
import { MOCK_LIST } from "./mock";

export const useNpcStore = create<NpcStoreTypes>((set, get) => ({
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
    MOCK_LIST.forEach(item => {
      const locItem = {
        name: item.name,
        id: item.id,
        image: item.image,
        region: item.region,
      };

      if (regions[item.region]) {
        regions[item.region].push(locItem);
        return;
      }
      regions[item.region] = [locItem];
    })

    set({
      npcList: MOCK_LIST.map(item => ({
        name: item.name,
        id: item.id,
        image: item.image,
        region: item.region,
      })),
      regionList: regions,
    })
    const id = get().activeId || MOCK_LIST[0]?.id || 0;
    await get().setActiveId(id);
  },

  activeId: 0,
  setActiveId: activeId => {
    if (get().activeId !== activeId) {
      set({ activeId });
      get().loadNpc(activeId);
      localStorage.setItem('activeId', `${activeId}`);
      get().setCheckedRegion(get().region)
    }
  },
  loadNpc: async (id: number) => {
    const char = MOCK_LIST.find(item => item.id === id);
    if (!char) return;

    set({
      id: char.id,
      name: char.name,
      region: char.region,
      image: char.image,
      type: char.type,
      description: char.description,
      goal: char.goal,
      relation: char.relation,
      rolls: char.rolls,
      customRollTitle: char.customRollTitle,
      danger: char.danger,
      features: char.features,
      triggers: char.triggers,
      checkDifficulty: char.checkDifficulty,
      checkFailure: char.checkFailure,
      extra: char.extra,
    });
  },

  createNpc: async () => { },
  updateNpc: async () => {
    set(state => ({ fetching: { ...state.fetching, update: true } }))
    await new Promise((res) => setTimeout(() => res(''), 1500));
    set(state => ({ fetching: { ...state.fetching, update: false } }))
  },
  deleteNpc: async () => { },

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

  customRollTitle: '',
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
