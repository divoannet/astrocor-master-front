import { useEffect } from "react"
import { useTraitsStore, usePageStore, useTraitFormStore } from "@/store";
import { Box, Card, Button, Text } from "@chakra-ui/react"
import { DeleteDialog } from "./DeleteDialog";
import { TraitForm } from "./TraitForm";
import { TraitItem } from "./TraitItem";

export const TraitsListPage = () => {
  const loadTraits = useTraitsStore(state => state.loadTraits);
  const traits = useTraitsStore(state => state.traits);
  const open = usePageStore(state => state.createTraitModalOpen);
  const toggle = usePageStore(state => state.toggleCreateTraitModal);

  const resetForm = useTraitFormStore(state => state.resetForm);

  const active = traits.filter(trait => !trait.draft);
  const drafts = traits.filter(trait => trait.draft);

  const handleAddTrait = () => {
    resetForm();
    toggle(true);
  }

  useEffect(() => {
    loadTraits();
  }, []);

  return (
    <Box padding={4} spaceY={4}>
      <Card.Root padding='1'>
        <Card.Body padding={4}>
          <div>
            <Button size='sm' onClick={handleAddTrait}>Добавить специализацию</Button>
          </div>
        </Card.Body>
      </Card.Root>
      {active.length > 0 && <Text textStyle="md" fontWeight="semibold">Опубликованные</Text>}
      <Box className="dynamic-box" spaceY={4} paddingRight={open ? '500px' : '0px'}>
        {active.map((trait, i) => (
          <TraitItem key={`active_${i}`} trait={trait} />
        ))}
      </Box>
      {drafts.length > 0 && <Text textStyle="md" fontWeight="semibold">Черновики</Text>}
      <Box className="dynamic-box" spaceY={4} paddingRight={open ? '500px' : '0px'}>
        {drafts.map((trait, i) => (
          <TraitItem key={`drafts_${i}`} trait={trait} />
        ))}
      </Box>
      <TraitForm />
      <DeleteDialog />
    </Box>
  )
}