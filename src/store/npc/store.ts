import {create} from "zustand/react";
import {type NpcStoreTypes} from "./types";
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
  loadNpcList: async () => {
    set({
      npcList: MOCK_LIST.map(item => ({
        name: item.name,
        id: item.id,
        image: item.image
      }))
    })
    const id = get().id || 1;
    await get().loadNpc(id);
  },

  loadNpc: async (id: number) => {
    const char = MOCK_LIST.find(item => item.id === id);
    if (!char) return;

    set({
      id: char.id,
      name: char.name,
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

  createNpc: async () => {},
  updateNpc: async () => {},
  deleteNpc: async () => {},

  id: 0,
  image: '',
  setImage: image => set({image}),

  name: '',
  setName: name => set({name}),

  type: '',
  setType: type => set({type}),

  description: '',
  setDescription: description => set({description}),

  goal: '',
  setGoal: goal => set({goal}),

  relation: '',
  setRelation: relation => set({relation}),

  rolls: {
    battle: 0,
    intellect: 0,
    craft: 0,
    physical: 0,
    social: 0,
    custom: 0,
  },
  setRoll: (key, value) => set(store => ({ rolls: {...store.rolls, [key]: value} })),

  customRollTitle: '',
  setCustomRollTitle: customRollTitle => set({customRollTitle}),

  danger: '',
  setDanger: danger => set({danger}),
  features: '',
  setFeatures: features => set({features}),
  triggers: '',
  setTriggers: triggers => set({triggers}),

  checkDifficulty: 0,
  setCheckDifficulty: checkDifficulty => set({checkDifficulty}),
  checkFailure: '',
  setCheckFailure: checkFailure => set({checkFailure}),

  extra: '',
  setExtra: extra => set({extra}),
}));
