import { create } from "zustand/react";
import { type PageStoreType } from "./types";

export const usePageStore = create<PageStoreType>(set => ({
  deleteDialogOpen: false,
  toggleDeleteDialog: open => set(state => ({ deleteDialogOpen: typeof open === 'boolean' ? open : !state.deleteDialogOpen })),

  rollsSettingDialogOpen: false,
  toggleRollsSettingDialog: open => set(state => ({ rollsSettingDialogOpen: typeof open === 'boolean' ? open : !state.rollsSettingDialogOpen })),

  createNpcModalOpen: false,
  toggleCreateNpcModal: open => set(state => ({ createNpcModalOpen: typeof open === 'boolean' ? open : !state.createNpcModalOpen })),

  createTraitModalOpen: false,
  toggleCreateTraitModal: open => set(state => {
    document.body.classList.toggle('notFixed', open);
    return { createTraitModalOpen: typeof open === 'boolean' ? open : !state.createTraitModalOpen };
  }),

  searchDialogOpened: false,
  toggleSearchDialog: open => set(state => ({ searchDialogOpened: typeof open === 'boolean' ? open : !state.searchDialogOpened })),

  screen: 'npc',
  setScreen: screen => {
    localStorage.setItem('screen', screen);
    set({ screen });
  },
}));
