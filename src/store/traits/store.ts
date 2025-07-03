import { create } from "zustand";
import type { TraitStoreActionsState, TraitStoreState } from "./types";
import { toaster } from "@/components/ui/toaster";

export const useTraitsStore = create<TraitStoreState & TraitStoreActionsState>((set, get) => ({
  fetching: false,
  updating: false,

  focusId: null,
  setFocusId: focusId => set({ focusId }),

  traits: [],
  loadTraits: async () => {
    try {
      set({ fetching: true, });
      const response = await fetch('https://f.etrin.ru/api/charlist/traitlist');
      const traits = await response.json();

      set({ traits });
    } catch (e) {
      toaster.create({
        type: 'error',
        description: 'Ошибка загрузки',
      })
    } finally {
      set({ fetching: false });
    }
  },

  addTrait: async () => {},
  removeTrait: async (id: number) => {
    try {
      await fetch(`https://f.etrin.ru/api/charlist/trait?id=${id}`, {
        method: 'DELETE',
      });
    }
    finally {}
  },
  toggleTraitVisability: async (id, value) => {
    try {
      const params = {
        id,
        draft: value,
      };
      await fetch('https://f.etrin.ru/api/charlist/trait', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: 'PATCH',
        body: JSON.stringify(params),
      });
      await get().loadTraits();
    }
    finally {}
  },
  reorderTraits: async () => {},

  updateTrait: async () => {},
}));
