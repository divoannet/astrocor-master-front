import { create } from "zustand";
import type { TraitItemType, TraitStoreActionsState, TraitStoreState } from "./types";
import { toaster } from "@/components/ui/toaster";
import { apiRequest } from "@/services/api";

export const useTraitsStore = create<TraitStoreState & TraitStoreActionsState>((set, get) => ({
  fetching: false,
  updating: false,

  focusId: null,
  setFocusId: focusId => set({ focusId }),

  traits: [],
  loadTraits: async () => {
    try {
      set({ fetching: true, });
      const traits = await apiRequest<TraitItemType[]>('/traitlist');

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
      await apiRequest(`/trait?id=${id}`, {
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
      await apiRequest('/trait', {
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
