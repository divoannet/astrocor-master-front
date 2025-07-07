import { create } from "zustand";
import type { RulesPageType } from "./types";

export const useRulesStore = create<RulesPageType>(set => ({
  fetching: false,
  updating: false,
  rules: {},

  load: async () => {
    try {
      set({ fetching: true });
      const response = await fetch('https://f.etrin.ru/api/charlist/rules');
      const rules = await response.json();
      set({ rules });
    } finally {
      set({ fetching: false })
    }
  },
  save: async (key: string, value: string) => {
    try {
      set({ updating: true });
      const params = { id: key, value };
      await fetch('https://f.etrin.ru/api/charlist/rules', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: 'PATCH',
        body: JSON.stringify(params),
      });
    } finally {
      set({ updating: false });
    }
  }
}));