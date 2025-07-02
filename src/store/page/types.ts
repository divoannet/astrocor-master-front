export type ScreenType = 'npc' | 'traits';

export interface PageStoreType {
  rollsSettingDialogOpen: boolean;
  toggleRollsSettingDialog: (open?: boolean) => void;

  deleteDialogOpen: boolean;
  toggleDeleteDialog: (open?: boolean) => void;

  createNpcModalOpen: boolean;
  toggleCreateNpcModal: (open?: boolean) => void;

  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}