import { useEffect } from "react"
import { useTraitsStore, usePageStore } from "@/store";
import { Box, Card, SimpleGrid, Button, Text } from "@chakra-ui/react"
import { DeleteDialog } from "./DeleteDialog";
import { TraitForm } from "./TraitForm";
import { TraitItem } from "./TraitItem";

export const TraitsListPage = () => {
  const loadTraits = useTraitsStore(state => state.loadTraits);
  const traits = useTraitsStore(state => state.traits);
  const toggle = usePageStore(state => state.toggleCreateTraitModal);

  const active = traits.filter(trait => !trait.draft);
  const drafts = traits.filter(trait => trait.draft);

  useEffect(() => {
    loadTraits();
  }, []);

  return (
    <Box padding={4} spaceY={4}>
      <Card.Root padding='1'>
        <Card.Body padding={4}>
          <div>
            <Button size='sm' onClick={() => toggle(true)}>Добавить специализацию</Button>
          </div>
        </Card.Body>
      </Card.Root>
      {active.length > 0 && <Text textStyle="md" fontWeight="semibold">Опубликованные</Text>}
      <SimpleGrid columns={3} gapX={4} gapY={4}>
        {active.map((trait, i) => (
          <TraitItem key={`active_${i}`} trait={trait} />
        ))}
      </SimpleGrid>
      {drafts.length > 0 && <Text textStyle="md" fontWeight="semibold">Черновики</Text>}
      <SimpleGrid columns={3} gapX={4} gapY={4}>
        {drafts.map((trait, i) => (
          <TraitItem key={`drafts_${i}`} trait={trait} />
        ))}
      </SimpleGrid>
      <TraitForm />
      <DeleteDialog />
    </Box>
  )
}