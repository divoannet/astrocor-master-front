import { useNpcStore, usePageStore } from "@/store"
import { Button, Dialog, Portal } from "@chakra-ui/react"
import { NpcForm } from "./Form";
import { useNpcFormStore } from "@/store/npcForm/store";
import { type NpcStoreTypes as RealNpcStoreTypes } from "@/store/npc/types";

export const CreateNpcForm = () => {
  const open = usePageStore(state => state.createNpcModalOpen);
  const toggle = usePageStore(state => state.toggleCreateNpcModal);

  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const createNpc = useNpcFormStore(state => state.createNpc);
  const resetForm = useNpcFormStore(state => state.reset);

  // TEMP
  const fullNpcList = useNpcStore(state => state.fullNpcList);
  const getValues = useNpcFormStore(state => state.getValues);
  const addNpc = useNpcStore(state => state.addNpc);
  // /TEMP

  const handleSave = async () => {
    await createNpc();

    // TEMP
    const vl = getValues();
    const npc: RealNpcStoreTypes = {
      ...vl,
      name: vl.name || `Ежевичка ${fullNpcList.length + 1}`,
      id: fullNpcList.length + 1,
    }
    addNpc(npc);
    // /TEMP

    resetForm();
    await loadNpcList();
  }

  const handleSaveAndExit = async () => {
    await handleSave();
    toggle(false);
  }

  const handleCancel = () => {
    resetForm();
    toggle(false);
  }

  return (
    <Dialog.Root
      open={open} size="cover"
      onOpenChange={(e) => toggle(e.open)}
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Создать персонажа</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <NpcForm />
            </Dialog.Body>
            <Dialog.Footer>
              <Button size="sm" variant='outline' onClick={handleCancel}>
                Отменить
              </Button>
              <Button size="sm" variant='outline' onClick={handleSave}>
                Сохранить и создать ещё одного
              </Button>
              <Button size="sm" onClick={handleSaveAndExit}>
                Сохранить и выйти
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
