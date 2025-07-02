import { useNpcStore, usePageStore } from "@/store";
import { Button, Dialog } from "@chakra-ui/react";

export const DeleteDialog = () => {
  const name = useNpcStore(state => state.name);
  const deleteNpc = useNpcStore(state => state.deleteNpc);
  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const open = usePageStore(state => state.deleteDialogOpen);
  const toggleDeleteDialog = usePageStore(state => state.toggleDeleteDialog);

  const handleConfirm = async () => {
    await deleteNpc();
    toggleDeleteDialog(false);
    await loadNpcList();
  }

  return (
    <Dialog.Root open={open} onOpenChange={e => toggleDeleteDialog(e.open)}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Удаление персонажа</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            Точно удалить персонажа? {name} не сможет вернуться.
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => toggleDeleteDialog(false)} variant='outline'>Оставить</Button>
            <Button onClick={handleConfirm}>Удалить</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}