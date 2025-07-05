import { initDB } from "./db";
import { normalizeNPC } from "./db/helpers";
import type { NPC } from "./db/types";

export const handleImportClick = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return reject('Файл не выбран');

      try {
        const text = await file.text();
        const rawData = JSON.parse(text);

        if (!Array.isArray(rawData)) {
          alert('Файл должен содержать массив NPC');
          return reject('Неверный формат данных');
        }

        const normalized: NPC[] = rawData.map(normalizeNPC);
        const db = await initDB();
        const tx = db.transaction('npcs', 'readwrite');
        const store = tx.objectStore('npcs');

        for (const npc of normalized) {
          await store.put(npc);
        }

        await tx.done;
        resolve(); // 👍 завершение промиса
      } catch (err) {
        console.error('Ошибка при импорте:', err);
        alert('Ошибка при импорте. Убедитесь, что файл корректен.');
        reject(err);
      }
    };

    input.click();
  });
};

