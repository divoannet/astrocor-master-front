import {create} from "zustand/react";
import {type PageStoreType} from "./types";

export const usePageStore = create<PageStoreType>(set => ({
  deleteDialogOpen: false,
  toggleDeleteDialog: open => set(state => ({ deleteDialogOpen: typeof open === 'boolean' ? open : !state.deleteDialogOpen})),

  rollsSettingDialogOpen: false,
  toggleRollsSettingDialog: open => set(state => ({ rollsSettingDialogOpen: typeof open === 'boolean' ? open : !state.rollsSettingDialogOpen})),

  createNpcModalOpen: false,
  toggleCreateNpcModal: open => set(state => ({ createNpcModalOpen: typeof open === 'boolean' ? open : !state.createNpcModalOpen})),

  screen: 'npc',
  setScreen: screen => set({screen}),
}));
