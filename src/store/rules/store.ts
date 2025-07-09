import { create } from "zustand";
import type { RulesPageType } from "./types";
import { apiRequest } from "@/services/api";

export const useRulesStore = create<RulesPageType>(set => ({
  fetching: false,
  updating: false,
  rules: {},

  load: async () => {
    try {
      set({ fetching: true });
      const rules = await apiRequest<Record<string, string>>('/rules');;
      set({ rules });
    } finally {
      set({ fetching: false })
    }
  },
  save: async (key: string, value: string) => {
    try {
      set({ updating: true });
      const params = { id: key, value };
      await apiRequest('/rules', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: 'PATCH',
        body: JSON.stringify(params),
      })
    } finally {
      set({ updating: false });
    }
  }
}));