export type ScreenType = 'npc' | 'traits' | 'rules';

export interface PageStoreType {
  rollsSettingDialogOpen: boolean;
  toggleRollsSettingDialog: (open?: boolean) => void;

  deleteDialogOpen: boolean;
  toggleDeleteDialog: (open?: boolean) => void;

  createNpcModalOpen: boolean;
  toggleCreateNpcModal: (open?: boolean) => void;

  createTraitModalOpen: boolean;
  toggleCreateTraitModal: (open?: boolean) => void;

  screen: string;
  setScreen: (screen: string) => void;
}