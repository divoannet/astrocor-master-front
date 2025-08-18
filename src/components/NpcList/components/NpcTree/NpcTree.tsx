import { useNpcStore } from "@/store";
import { NpcTreeItem } from "./NpcTreeItem";
import { RegionPicker } from "@/components/RegionPicker";
import { useState } from "react";

export const NpcTree = () => {
  const groups = useNpcStore(state => state.groups);
  const groupList = useNpcStore(state => state.groupList);
  const loadNpcList = useNpcStore(state => state.loadNpcList);
  const toggleFolder = useNpcStore(state => state.toggleFolder);
  const updateFolder = useNpcStore(state => state.updateFolder);

  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<number | undefined>(undefined);

  const handleMoveStart = (groupId: number) => {
    setActiveGroup(groupId);
    setRegionModalOpen(true);
  }

  const handleOpenChange = (open: boolean) => {
    setRegionModalOpen(open);
    if (!open) {
      setActiveGroup(undefined);
    }
  }
  
  const handleMoveGroup = async (to: number) => {
    const group = groupList.find(item => item.id === activeGroup);
    if (!group) return;
    if (group.id === to) return;
    await updateFolder({
      ...group,
      parentId: to,
    });
    await loadNpcList();
    handleOpenChange(false);
    await toggleFolder(group.id, true);
  }

  return (
    <div>
      {groups.map(group => (
        <NpcTreeItem
          depth={0}
          key={group.id}
          group={group}
          onMoveStart={handleMoveStart}
        />
      ))}
      <RegionPicker
        open={regionModalOpen}
        onOpenChange={handleOpenChange}
        onChange={handleMoveGroup}
        activeGroup={activeGroup}
        hideActiveGroup={true}
      />
    </div>
  )
}
