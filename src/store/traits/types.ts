export type TagItemType = {
  title: string;
  level: number;
  description: string;
}

export type SecretType = {
  title: string;
  description: string;
  hint: string;
  price: string;
}

export type TraitItemType = {
  id: number;
  title: string;
  draft: boolean;
  specializing: boolean;
  tags: TagItemType[];
  secret: SecretType;
}

export interface TraitStoreState {
  fetching: boolean;
  updating: boolean;

  focusId: number | null;

  traits: TraitItemType[];
}

export interface TraitStoreActionsState {
  loadTraits: () => Promise<void>;

  setFocusId: (id: number) => void;

  addTrait: () => Promise<void>;
  toggleTraitVisability: (id: number, value: boolean) => Promise<void>,
  removeTrait: (id: number) => Promise<void>;
  reorderTraits: () => Promise<void>;

  updateTrait: () => Promise<void>;
}
