import { usePageStore } from "@/store";
import { useTraitsStore } from "@/store/traits/store";
import { Button, Dialog } from "@chakra-ui/react";

export const DeleteDialog = () => {
  const removeTrait = useTraitsStore(state => state.removeTrait);
  const loadTraits = useTraitsStore(state => state.loadTraits);
  const focusId = useTraitsStore(state => state.focusId);

  const open = usePageStore(state => state.deleteDialogOpen);
  const toggleDeleteDialog = usePageStore(state => state.toggleDeleteDialog);

  const handleConfirm = async () => {
    toggleDeleteDialog(false);
    if (!focusId) return;
    await removeTrait(focusId);
    await loadTraits();
  }

  return (
    <Dialog.Root open={open} onOpenChange={e => toggleDeleteDialog(e.open)}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Удаление специализации</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            Точно удалить специализацию? У игроков из чарлиста она не пропадёт.
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