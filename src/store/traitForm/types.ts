export type TagItemType = {
  title: string;
  level: number;
  description: string;
}

export interface TraitStoreState {
  id: number;
  title: string;
  epigraph: string;
  description: string;
  price: string;
  tags: TagItemType[];
  secret: {
    title: string;
    description: string;
    hint: string;
    price: string;
  };
}

export interface TraitStoreActionsState {
  saving: boolean;

  setValues: (values: Partial<TraitStoreState>) => void;
  setTagValue: (index: number, key: keyof TagItemType, value: any) => void;
  setSecretValue: (key: keyof TraitStoreState['secret'], value: any) => void;
  addTag: () => void;
  removeTag: (index: number) => void;
  resetForm: () => void;

  saveTrait: () => Promise<void>;
}
