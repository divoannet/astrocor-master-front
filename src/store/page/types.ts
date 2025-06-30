export type ScreenType = 'npc' | 'traits';

export interface PageStoreType {
  mainMenuOpen: boolean;
  toggleMainMenu: (open?: boolean) => void;

  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}