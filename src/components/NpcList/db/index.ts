import { openDB } from 'idb';
import type { NPC, NPCListItem } from './types';
import { normalizeNPC } from './helpers';

const DB_NAME = 'npcDB';
const STORE_NAME = 'npcs';

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    }
  });
};

export const saveNpc = async (npc: Partial<NPC>) => {
  const db = await initDB();
  await db.put(STORE_NAME, normalizeNPC(npc));
};

export const getNpcList = async (full?: boolean): Promise<NPCListItem[]> => {
  const db = await initDB();
  const all = await db.getAll(STORE_NAME);
  return full ? all : all.map((npc: any) => ({
    id: npc.id,
    name: npc.name || '',
    image: npc.image || '',
    region: npc.region || '',
  }));
};

export const getNpcById = async (id: number): Promise<NPC | null> => {
  const db = await initDB();
  const npc = await db.get(STORE_NAME, id);
  return npc ? normalizeNPC(npc) : null;
};

export const deleteNPC = async (id: number) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

export const exportNpcData =  async () => {
  const allNPCs = await getNpcList(true);
  const dataStr = JSON.stringify(allNPCs, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `npcs_export_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const importNpcData = async (json: string) => {
  const data: NPC[] = JSON.parse(json);
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  for (const npc of data) {
    await store.put(npc);
  }
  await tx.done;
};
