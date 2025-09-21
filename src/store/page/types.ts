export type ScreenType = 'npc' | 'traits' | 'rules';

export interface PageStoreType {
  searchDialogOpened: boolean;
  toggleSearchDialog: (open?: boolean) => void;

  rollsSettingDialogOpen: boolean;
  toggleRollsSettingDialog: (open?: boolean) => void;

  reorderDialogOpen: boolean;
  toggleReorderDialog: (open?: boolean) => void;

  deleteDialogOpen: boolean;
  toggleDeleteDialog: (open?: boolean) => void;

  createNpcModalOpen: boolean;
  toggleCreateNpcModal: (open?: boolean) => void;

  createTraitModalOpen: boolean;
  toggleCreateTraitModal: (open?: boolean) => void;

  screen: string;
  setScreen: (screen: string) => void;
}