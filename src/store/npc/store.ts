import { create } from "zustand/react";
import { type NpcStoreTypes, type NpcStoreActionTypes } from "./types";
import { toaster } from "@/components/ui/toaster";
import { deleteNPC, getNpcById, getNpcList, saveNpc, saveGroup, getGroupTree, deleteGroup, getGroupById, getGroupList } from "@/components/NpcList/db";
import type { Group, NPCListItem } from "@/components/NpcList/db/types";

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
  groups: [],
  groupList: [],
  checkedRegion: '',
  setCheckedRegion: checkedRegion => {
    localStorage.setItem('checkedRegion', checkedRegion);
    set({ checkedRegion });
  },
  loadNpcList: async () => {
    const regions: Record<string, any[]> = {};

    try {
      const list = await getNpcList(true);
      let groups = await getGroupTree();
      let groupList = await getGroupList();
      get().getRegion();

      list.forEach((item: NPCListItem) => {
        const region = item.region || 'Прочие';
        if (regions[region]) {
          regions[region].push(item);
          return;
        }
        regions[region] = [item];
      })

      set({
        npcList: list as NpcStoreTypes[],
        regionList: regions,
        groups,
        groupList,
      })
      if (list[0] && get().activeId === null) {
        const id = get().activeId || list[0]?.id || 0;
        await get().setActiveId(id);
      }
    } finally {

    }
  },

  activeId: null,
  setActiveId: async (activeId) => {
    set({ activeId });

    if (activeId !== null) {
      get().loadNpc(activeId);
      await localStorage.setItem('activeId', `${activeId}`);
      const char = await getNpcById(activeId);
      char && await get().toggleFolder(char?.groupId, true);
      await get().loadNpcList();
    } else {
      localStorage.removeItem('activeId');
    }
  },

  addFolder: async (parentId) => {
    parentId !== null && get().toggleFolder(parentId, true);
    await saveGroup({
      name: 'Новая группа',
      parentId: parentId || null,
      sortOrder: 0,
      open: false,
    });
    get().loadNpcList();
  },
  updateFolder: async (group) => {
    await saveGroup(group);
    get().loadNpcList();
  },
  removeFolder: async (id) => {
    await deleteGroup(id);
    get().loadNpcList();
  },
  moveFolder: async (id, parentId) => { },
  toggleFolder: async (id, open) => {
    if (typeof id !== 'number') return;

    const group = await getGroupById(id);
    if (!group) return;
    const newValue = typeof open === 'boolean' ? open : !group.open;

    await saveGroup({
      ...group,
      open: newValue,
    });
    if (newValue) {
      if (typeof group.parentId === 'number') {
        await get().toggleFolder(group.parentId, true);
      }
    }
  },

  loadNpc: async (id: number) => {
    try {
      const char = await getNpcById(id);
      if (!char) return;

      set({
        id: char.id || 0,
        name: char.name || '',
        image: char.image || '',
        description: char.description || '',
        goal: char.goal || '',
        groupId: char.groupId || 0,
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
        groupId: get().groupId || 0,
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
      await saveNpc(params);
      toaster.create({
        type: 'success',
        description: 'Сохранилось'
      });
    } finally {

    }

  },
  deleteNpc: async () => {
    const activeId = get().activeId;
    try {
      if (activeId === null) return;
      await deleteNPC(activeId);
      toaster.create({
        type: 'success',
        description: 'Персонаж ушёл',
      });
      get().setActiveId(null);
      if (get().npcList.length === 0) {
        get().setCheckedRegion('');
      }
    } finally {

    }
  },

  id: 0,
  groupId: 0,
  setGroupId: (groupId: number) => set({ groupId }),

  image: '',
  setImage: image => set({ image }),

  name: '',
  setName: name => set({ name }),

  region: 'Эрдофольд',
  setRegion: region => set({ region }),
  getRegion: () => {
    const getRoute = (regionId: number): string => {
      const region = get().groupList.find(group => group.id === regionId);
      if (!region) return '--';
      const isRoot = region.parentId === null;
      return isRoot ? region.name : `${getRoute(region.parentId as number)} » ${region.name}`;
    }

    const region = getRoute(get().groupId);
    set({ region });
    return region;
  },

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
