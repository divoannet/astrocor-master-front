import { useCallback, useEffect, useState } from "react";
import { usePageStore, useNpcStore } from "@/store";
import { Button, Dialog } from "@chakra-ui/react"
import type { TreeGroupItem, RootTreeGroupItem } from "../NpcList/db/types";
import { Item } from "./Item";

interface Props {
  group: RootTreeGroupItem;
}

export const ReorderDialog = ({ group }: Props) => {
  const [groups, setGroups] = useState<TreeGroupItem[]>([]);

  const open = usePageStore(state => state.reorderDialogOpen);
  const toggleDialog = usePageStore(state => state.toggleReorderDialog);
  const saveGroup = useNpcStore(state => state.updateFolder);
  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
    if (!group || !group.childern) return;
    setGroups(prevGroups => {
      const newValue = [...prevGroups];
      const [removed] = newValue.splice(dragIndex, 1);
      newValue.splice(hoverIndex, 0, removed);
      return newValue;
    });
  }, [group?.childern]);

  const handleSave = async () => {
    const newOrder = groups.map((item, index) => ({ ...item, sortOrder: index }));
    for (let i = 0; i < groups.length; i++) {
      await saveGroup(newOrder[i]);
    }
    await loadNpcList();
    await toggleDialog(false);
  }

  useEffect(() => {
    setGroups(group?.childern || []);
  }, [group?.id]);

  return (
    <Dialog.Root open={open} onOpenChange={e => toggleDialog(e.open)}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Упорядочить папку {group?.name}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {groups.map((group, index) => <Item key={group.id} index={index} group={group} move={handleMove} />)}
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={handleSave} size="xs">Готово</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}