import { useNpcStore } from "@/store";
import { NpcTreeItem } from "./NpcTreeItem";

export const NpcTree = () => {
  const groups = useNpcStore(state => state.groups);

  return (
    <div>
      {groups.map(group => (
        <NpcTreeItem depth={0} key={group.id} group={group} />
      ))}
    </div>
  )
}
