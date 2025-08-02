import type { NPC } from "./types";


export const normalizeNPC = (npc: Partial<NPC>): NPC => ({
  id: npc.id ?? 0,
  name: npc.name ?? '',
  description: npc.description ?? '',
  image: npc.image ?? '',
  region: npc.region ?? '',
  goal: npc.goal ?? '',
  groupId: npc.groupId ?? 0,
  relation: npc.relation ?? '',
  customRollTitle: npc.customRollTitle ?? '',
  danger: npc.danger ?? '',
  features: npc.features ?? '',
  triggers: npc.triggers ?? '',
  checkDifficulty: npc.checkDifficulty ?? 0,
  checkFailure: npc.checkFailure ?? '',
  extra: npc.extra ?? '',
  rolls: {
    battle: npc.rolls?.battle ?? 0,
    intellect: npc.rolls?.intellect ?? 0,
    craft: npc.rolls?.craft ?? 0,
    physical: npc.rolls?.physical ?? 0,
    social: npc.rolls?.social ?? 0,
    custom: npc.rolls?.custom ?? 0,
  }
});
