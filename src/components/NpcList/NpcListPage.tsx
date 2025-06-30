import { Grid, GridItem, Spacer, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNpcStore } from "@/store";
import { NpcList } from "./components/NpcList";
import { NpcCard } from "./components/NpcCard";
import { NpcInfo } from "./components/NpcInfo";
import { NpcRolls } from "./components/NpcRolls";
import { NpcHabits } from "./components/NpcHabits";
import { TextItem } from "./components/TextItem";

export const NpcListPage = () => {
  const loadList = useNpcStore(state => state.loadNpcList);
  
  const extra = useNpcStore(state => state.extra);
  const setExtra = useNpcStore(state => state.setExtra);

  useEffect(() => {
    loadList();
  }, [])

  return (
    <Grid
      templateRows="min-content 1fr"
      templateColumns="20% 80%"
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
              onChange={setExtra}
              multiline
            />
          </Tabs.Content>

        </Tabs.Root>
      </GridItem>
    </Grid>
  )
}