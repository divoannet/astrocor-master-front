import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex, IconButton } from "@chakra-ui/react";
import { TiFolder } from "react-icons/ti";
import { CgReorder } from "react-icons/cg";
import { Tooltip } from "../../../ui/tooltip";

import { useNpcStore, usePageStore } from "@/store";
import { RegionPicker } from "@/components/RegionPicker";
import { ReorderDialog } from "@/components/ReorderDialog";
import type { RootTreeGroupItem } from "../../db/types";
import { NpcTreeItem } from "./NpcTreeItem";
import { CharItem } from "./CharItem";

export const NpcTree = () => {
  const groups = useNpcStore(state => state.groups);
  const groupList = useNpcStore(state => state.groupList);
  const npcsWitoutGroup = useNpcStore(state => state.npcsWitoutGroup);
  const loadNpcList = useNpcStore(state => state.loadNpcList);
  const toggleFolder = useNpcStore(state => state.toggleFolder);
  const updateFolder = useNpcStore(state => state.updateFolder);
  const addFolder = useNpcStore(state => state.addFolder);
  const toggleReorderDialog = usePageStore(state => state.toggleReorderDialog);

  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<number | undefined>(undefined);

  const [selectedGroup, setSelectedGroup] = useState<RootTreeGroupItem | null>(null);

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

  const handleReorderClick = () => {
    const group: RootTreeGroupItem = {
      id: null,
      name: 'Корневая',
      parentId: null,
      sortOrder: 0,
      open: true,
      childern: groups,
    }
    setSelectedGroup(group);
    toggleReorderDialog(true);
  }

  const handleAddClick = () => {
    addFolder(null);
  }

  return (
    <div>
      <Flex justify="flex-end" gap={2} mb={4}>
        <Tooltip content="Навести порядок">
          <IconButton variant='ghost' p={0} onClick={handleReorderClick} size='xs'><CgReorder /></IconButton>
        </Tooltip>
        <Tooltip content="Новая папка">
          <IconButton variant='ghost' p={0} onClick={handleAddClick}  size='xs'><TiFolder /></IconButton>
        </Tooltip>
      </Flex>
      {groups.map(group => (
        <NpcTreeItem
          depth={0}
          key={group.id}
          group={group}
          onSelect={setSelectedGroup}
          onMoveStart={handleMoveStart}
        />
      ))}
      {npcsWitoutGroup.map(npc => (
        <CharItem key={npc.id} char={npc} />
      ))}
      <RegionPicker
        open={regionModalOpen}
        onOpenChange={handleOpenChange}
        onChange={handleMoveGroup}
        activeGroup={activeGroup}
        hideActiveGroup={true}
      />
      <DndProvider backend={HTML5Backend}>
        {selectedGroup && (
          <ReorderDialog
            group={selectedGroup}
          />
        )}
      </DndProvider>
    </div>
  )
}
