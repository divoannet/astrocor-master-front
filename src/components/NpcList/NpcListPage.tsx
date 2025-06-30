import { Button, Grid, GridItem, Menu, Portal, Spacer, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNpcStore, usePageStore } from "@/store";
import { NpcList } from "./components/NpcList";
import { NpcCard } from "./components/NpcCard";
import { NpcInfo } from "./components/NpcInfo";
import { NpcRolls } from "./components/NpcRolls";
import { NpcHabits } from "./components/NpcHabits";
import { TextItem } from "./components/TextItem";
import { BsThreeDots } from "react-icons/bs";
import { DeleteDialog } from "./components/DeleteDialog";

export const NpcListPage = () => {
  const loadList = useNpcStore(state => state.loadNpcList);
  const updateNpc = useNpcStore(state => state.updateNpc);

  const toggleDeleteDialog = usePageStore(state => state.toggleDeleteDialog);

  const setCheckedRegion = useNpcStore(state => state.setCheckedRegion);
  const setActiveId = useNpcStore(state => state.setActiveId);

  const extra = useNpcStore(state => state.extra);
  const setExtra = useNpcStore(state => state.setExtra);

  const handleChangeExtra = (value: string) => {
    setExtra(value);
    updateNpc();
  }

  useEffect(() => {
    const checkedRegion = localStorage.getItem('checkedRegion');
    if (checkedRegion) {
      setCheckedRegion(checkedRegion);
    }

    const activeId = localStorage.getItem('activeId');
    if (activeId) {
      setActiveId(parseInt(activeId));
    }

    loadList();
  }, [])

  return (
    <Grid
      templateRows="min-content 1fr"
      templateColumns="25% 75%"
      templateAreas={`"list card" "list info"`}
      className="npc-wrapper"
      gap={4}
      padding={4}
    >
      <GridItem gridArea="list">
        <NpcList />
      </GridItem>
      <GridItem gridArea="card">
        <NpcCard />
      </GridItem>
      <GridItem gridArea="info">

        <Tabs.Root defaultValue="info">

          <Tabs.List>
            <Tabs.Trigger value="info">
              Основное
            </Tabs.Trigger>
            <Tabs.Trigger value="roll">
              Проверки и потенциал
            </Tabs.Trigger>
            <Tabs.Trigger value="habits">
              Поведение в сцене
            </Tabs.Trigger>
            <Tabs.Trigger value="extra">
              Примечания
            </Tabs.Trigger>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant='ghost'>
                  <BsThreeDots />
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      colorPalette='red'
                      color='red'
                      value="new-txt"
                      onClick={() => toggleDeleteDialog(true)}
                    >
                      Удалить персонажа
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Tabs.Indicator />
          </Tabs.List>

          <Spacer h='2' />

          <Tabs.Content value="info">
            <NpcInfo />
          </Tabs.Content>
          <Tabs.Content value="roll">
            <NpcRolls />
          </Tabs.Content>
          <Tabs.Content value="habits">
            <NpcHabits />
          </Tabs.Content>
          <Tabs.Content value="extra">
            <TextItem
              value={extra}
              onChange={handleChangeExtra}
              multiline
            />
          </Tabs.Content>

        </Tabs.Root>

        <DeleteDialog />
      </GridItem>
    </Grid>
  )
}