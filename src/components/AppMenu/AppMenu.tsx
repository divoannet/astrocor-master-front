import {Button, CloseButton, Drawer, Portal, Stack} from "@chakra-ui/react";
import {usePageStore} from "@/store";

export const AppMenu = () => {
  const open = usePageStore(state => state.mainMenuOpen);
  const toggleMainMenu = usePageStore(state => state.toggleMainMenu);
  const setScreen = usePageStore(state => state.setScreen);

  return (
    <Drawer.Root open={open} placement="start" onOpenChange={(e) => toggleMainMenu(e.open)}>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content>

            <Drawer.Header>
              <Drawer.Title>Области мастерения</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <Stack>
                <Button variant="ghost" onClick={() => setScreen('npc')}>
                  Персонажи
                </Button>
              </Stack>
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>

          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}