import { openDB } from 'idb';
import type { NPC, NPCListItem, Group, TreeGroupItem } from './types';
import { normalizeNPC } from './helpers';
import type { NpcStoreTypes } from '@/store/npc/types';

const DB_NAME = 'npcDB';
const STORE_NAME = 'npcs';
const GROUP_STORE_NAME = 'groups';
const DB_VERSION = 15;

export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade: async (db, oldVersion, _, transaction) => {

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true, });
      }

      if (!db.objectStoreNames.contains(GROUP_STORE_NAME)) {
        db.createObjectStore(GROUP_STORE_NAME, { keyPath: 'id', autoIncrement: true, });
      }

      if (oldVersion < DB_VERSION) {
        const store = transaction.objectStore(STORE_NAME);
        const regions: string[] = [];
        let cursor = await store.openCursor();

        while (cursor) {
          const value = cursor.value;
          const region = value.region || 'Прочие';
          if (!regions.includes(region)) {
            regions.push(region);
          }
          const groupId = regions.findIndex(item => item === region);
          value.groupId = groupId;
          cursor.update(value);
          console.log(value);
          cursor = await cursor.continue();
        }

        const groupStore = transaction.objectStore(GROUP_STORE_NAME);
        for (let id = 0; id < regions.length; id++) {
          await groupStore.put({
            id,
            name: regions[id],
            parentId: null,
            sortOrder: id,
            open: false,
          })
        }
      }
    }
  });
};

const getLastIndex = async (collection: string) => {
  const db = await initDB();
  const tx = db.transaction(collection);
  const store = tx.objectStore(collection);
  const cursor = await store.openCursor(null, 'prev');

  if (cursor) {
    const lastRecord = cursor.value;

    return lastRecord?.id || 0;
  } else {
    return 0;
  }
}

export const saveGroup = async (group: Partial<Group>) => {
  const db = await initDB();
  const lastIndex = group.id ?? await getLastIndex(GROUP_STORE_NAME) + 1;
  const value = {
    name: group.name || 'Новая группа',
    parentId: group.parentId ?? null,
    sortOrder: group.sortOrder ?? 0,
    id: lastIndex,
    open: Boolean(group.open),
  };
  await db.put(GROUP_STORE_NAME, value);
}

export const deleteGroup = async (id: number) => {
  const db = await initDB();
  await db.delete(GROUP_STORE_NAME, id);
};

const composeGroupTree = (groups: Group[], parentId: number | null): TreeGroupItem[] => {
  return groups.filter(item => item.parentId === parentId).map(group => ({
    ...group,
    childern: composeGroupTree(groups, group.id),
  })).sort((a, b) => b.sortOrder - a.sortOrder);
};

export const getGroupList = async () => {
  const db = await initDB();
  let all = await db.getAll(GROUP_STORE_NAME);

  return all;
}

export const getGroupTree = async () => {
  const db = await initDB();
  let all = await db.getAll(GROUP_STORE_NAME);

  return composeGroupTree(all, null);
}

export const getGroupById = async (id: number): Promise<Group | null> => {
  const db = await initDB();
  const npc = await db.get(GROUP_STORE_NAME, id);
  return npc || null;
};

export const saveNpc = async (npc: Partial<NPC>) => {
  const db = await initDB();
  const values = { ...npc };
  if (typeof npc.id !== 'number') {
    values.id = await db.count(STORE_NAME);
  }
  await db.put(STORE_NAME, normalizeNPC(values));
};

export const getNpcList = async (full?: boolean): Promise<NPCListItem[] | NpcStoreTypes[]> => {
  const db = await initDB();
  const all = await db.getAll(STORE_NAME);
  return full ? all : all.map((npc: any) => ({
    id: npc.id,
    name: npc.name || '',
    image: npc.image || '',
    region: npc.region || '',
    groupId: npc.groupId || 0,
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

export const exportNpcData = async () => {
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
  const data: Partial<NPC>[] = JSON.parse(json);
  for (const npc of data) {
    const id = npc.id || await getLastIndex(STORE_NAME) + 1;
    await saveNpc({ id, ...npc });
  }
};
