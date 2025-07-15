import { create } from "zustand";
import type { TraitStoreActionsState, TraitStoreState } from "./types";
import { toaster } from "@/components/ui/toaster";
import { apiRequest } from "@/services/api";

const initialValues = {
  id: 0,
  title: '',
  epigraph: '',
  description: '',
  price: '30',
  tags: [
    { title: '', description: '', level: 3 },
    { title: '', description: '', level: 2 },
  ],
  secret: {
    title: '',
    description: '',
    hint: '',
    price: '10',
  },
}

export const useTraitFormStore = create<TraitStoreState & TraitStoreActionsState>((set, get) => ({
  saving: false,

  setValues: values => set({
    ...values,
  }),

  setSecretValue: (key, value) => set(state => ({
    secret: {
      ...state.secret,
      [key]: value,
    }
  })),

  setTagValue: (index, key, value) => {
    const tags = get().tags;
    const newValues = tags.map((item, i) => i === index ? ({
      ...item,
      [key]: value
    }) : item);
    set({ tags: newValues });
  },

  addTag: () => {
    set(state => ({
      tags: [
        ...state.tags,
        {
          title: '',
          level: 2,
          description: '',
        }
      ]
    }))
  },
  removeTag: index => {
    set(state => {
      const tags = [ ...state.tags ];
      tags.splice(index, 1);
      return {
        tags,
      }
    });
  },
  resetForm: () => {
    get().setValues({...initialValues});
  },

  id: 0,
  title: '',
  epigraph: '',
  description: '',
  price: '30',
  tags: [
    { title: '', description: '', level: 3 },
    { title: '', description: '', level: 2 },
  ],
  secret: {
    title: '',
    description: '',
    hint: '',
    price: '10',
  },

  saveTrait: async () => {
    try {
      set({ saving: true });

      const params: Record<string, any> = {
        title: get().title,
        epigraph: get().epigraph,
        description: get().description,
        price: Number(get().price),
        tags: get().tags,
        secret: {
          title: get().secret.title,
          description: get().secret.description,
          hint: get().secret.hint,
          price: Number(get().secret.price),
        },
      };

      if (get().id) {
        params.id = get().id;
      }

      await apiRequest('/trait', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: get().id ? 'PATCH' : 'POST',
        body: JSON.stringify(params),
      });
      toaster.create({
        type: 'success',
        description: 'Сохранено',
      })
    } catch (e) {
      toaster.create({
        type: 'error',
        description: 'Ошибка',
      })
    } finally {
      set({ saving: false })
    }
  },
}));
