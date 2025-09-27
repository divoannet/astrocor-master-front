import { initDB, type ExportDataTypeV1 } from "./db";
import { normalizeNPC } from "./db/helpers";
import type { Group, NPC } from "./db/types";

const checkData = (data: any) => {
  if (Array.isArray(data)) {
    return true;
  }
  if (typeof data === 'object' && data.version && Array.isArray(data.chars) && Array.isArray(data.groups)) {
    return true;
  }
  return false;
}

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

        if (!checkData(rawData)) {
          alert('Файл должен быть верного формата');
          return reject('Неверный формат данных');
        }

        if (Array.isArray(rawData)) {
          const normalized: NPC[] = rawData.map(normalizeNPC);
          const db = await initDB();
          const tx = db.transaction(['npcs', 'groups'], 'readwrite');
          const store = tx.objectStore('npcs');
          const groupStore = tx.objectStore('groups');

          for (let npc of normalized) {
            const region = npc.region;
            const npcs = await store.getAll();
            const groups = await groupStore.getAll();

            const getNpcLastIndex = npcs.length > 0
              ? Math.max(...npcs.map(g => g.id)) + 1
              : 1;
            npc.id = typeof npc.id === 'undefined' ? getNpcLastIndex : npc.id;

            let group = groups.find(item => item.name === region);
            if (!group) {
              const getLastIndex = groups.length > 0
                ? Math.max(...groups.map(g => g.id)) + 1
                : 1;
              const newGroup: Group = {
                id: getLastIndex,
                name: region,
                parentId: null,
                sortOrder: groups.length,
                open: false,
              }
              group = newGroup;
              await groupStore.put(newGroup);
            }
            await store.put({ ...npc, groupId: group.id });
          }

          await tx.done;
          resolve();
        }

        if (typeof rawData === 'object') {
          if (rawData.version === 1) {
            const v1Data: ExportDataTypeV1 = { ...rawData };
            const chars = v1Data.chars;
            const groups = v1Data.groups;

            const db = await initDB();
            const tx = db.transaction(['npcs', 'groups'], 'readwrite');
            const npcStore = tx.objectStore('npcs');
            const groupStore = tx.objectStore('groups');

            for (const npc of chars) {
              await npcStore.put(npc);
            }
            for (const group of groups) {
              await groupStore.put(group);
            }

            await tx.done;
            resolve();
          }
        }
      } catch (err) {
        console.error('Ошибка при импорте:', err);
        alert('Ошибка при импорте. Убедитесь, что файл корректен.');
        reject(err);
      }
    };

    input.click();
  });
};

