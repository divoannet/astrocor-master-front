import {create} from "zustand/react";
import {type PageStoreType} from "./types";

export const usePageStore = create<PageStoreType>(set => ({
  deleteDialogOpen: false,
  toggleDeleteDialog: open => set(state => ({ deleteDialogOpen: typeof open === 'boolean' ? open : !state.deleteDialogOpen})),

  rollsSettingDialogOpen: false,
  toggleRollsSettingDialog: open => set(state => ({ rollsSettingDialogOpen: typeof open === 'boolean' ? open : !state.rollsSettingDialogOpen})),

  createNpcModalOpen: false,
  toggleCreateNpcModal: open => set(state => ({ createNpcModalOpen: typeof open === 'boolean' ? open : !state.createNpcModalOpen})),

  createTraitModalOpen: false,
  toggleCreateTraitModal: open => set(state => ({ createTraitModalOpen: typeof open === 'boolean' ? open : !state.createTraitModalOpen})),

  screen: 'npc',
  setScreen: screen => {
    localStorage.setItem('screen', screen);
    set({screen});
  },
}));
