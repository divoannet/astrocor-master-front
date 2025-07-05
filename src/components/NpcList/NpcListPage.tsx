import { Box, Button, Card, Center, Flex, Grid, GridItem, Group } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNpcStore, usePageStore } from "@/store";
import { NpcList } from "./components/NpcList";
import { NpcCard } from "./components/NpcCard";
import { DeleteDialog } from "./components/DeleteDialog";
import { FieldDescription } from "./components/fields/FieldDescription";
import { FieldRelation } from "./components/fields/FieldRelation";
import { FieldDifficultyCheck } from "./components/fields/FieldDifficultyCheck";
import { FieldDifficultyFail } from "./components/fields/FieldDifficultyFail";
import { FieldDangerReaction } from "./components/fields/FieldDangerReaction";
import { FieldFeatures } from "./components/fields/FieldFeatures";
import { FieldTriggers } from "./components/fields/FieldTriggers";
import { FieldExtra } from "./components/fields/FieldExtra";

export const NpcListPage = () => {
  const loadList = useNpcStore(state => state.loadNpcList);
  const id = useNpcStore(state => state.activeId);

  const setCheckedRegion = useNpcStore(state => state.setCheckedRegion);
  const setActiveId = useNpcStore(state => state.setActiveId);

  const toggleDeleteDialog = usePageStore(state => state.toggleDeleteDialog);

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
      <GridItem gridArea="list" overflowY='auto'>
        <NpcList />
      </GridItem>
      <GridItem gridArea="card">
        {id !== null ? <NpcCard /> : (
          <Center h={4}>Нет выбранного персонажа</Center>
        )}
      </GridItem>
      <GridItem gridArea="info" overflowY='auto'>
        {id !== null &&
          (
            <Box spaceY={4} overflowY='auto'>
              <FieldDescription />
              <FieldRelation />
              <Group attached alignItems="stretch" width='100%' justifyContent='stretch'>
                <Card.Root size='sm' className="info">
                  <Card.Body>
                    <FieldDifficultyCheck />
                  </Card.Body>
                </Card.Root>
                <Card.Root size='sm' className="info" flexGrow='1'>
                  <Card.Body>
                    <FieldDifficultyFail />
                  </Card.Body>
                </Card.Root>
              </Group>
              <FieldDangerReaction />
              <FieldFeatures />
              <FieldTriggers />
              <FieldExtra />
              <Card.Root>
                <Card.Body>
                  <Flex justifyContent='flex-end'>
                    <Button
                      size='sm'
                      variant='outline'
                      colorPalette='red'
                      onClick={() => toggleDeleteDialog(true)}
                    >
                      Удалить перонажа
                    </Button>
                  </Flex>
                </Card.Body>
              </Card.Root>
            </Box>
          )}
        <DeleteDialog />
      </GridItem>
    </Grid>
  )
}