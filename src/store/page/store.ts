import {create} from "zustand/react";
import {type PageStoreType} from "./types";

export const usePageStore = create<PageStoreType>(set => ({
  mainMenuOpen: false,
  toggleMainMenu: open => set(state => ({ mainMenuOpen: typeof open === 'boolean' ? open : !state.mainMenuOpen})),

  deleteDialogOpen: false,
  toggleDeleteDialog: open => set(state => ({ deleteDialogOpen: typeof open === 'boolean' ? open : !state.deleteDialogOpen})),

  rollsSettingDialogOpen: false,
  toggleRollsSettingDialog: open => set(state => ({ rollsSettingDialogOpen: typeof open === 'boolean' ? open : !state.rollsSettingDialogOpen})),

  screen: 'npc',
  setScreen: screen => set({screen}),
}));
