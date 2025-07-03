import { useTraitsStore } from "@/store/traits/store";
import { Box, Card, Center, Flex, IconButton, Text, SimpleGrid, Group, Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { LevelIcon } from "../icons/LevelIcon";
import { LuEye, LuEyeOff, LuPencil } from "react-icons/lu";
import { Tooltip } from "../ui/tooltip";
import { TraitForm } from "./TraitForm";
import { usePageStore, useTraitFormStore } from "@/store";
import { IoTrashOutline } from "react-icons/io5";
import { DeleteDialog } from "./DeleteDialog";
import type { TraitItemType } from "@/store/traits/types";

export const TraitsListPage = () => {
  const loadTraits = useTraitsStore(state => state.loadTraits);
  const traits = useTraitsStore(state => state.traits);
  const toggle = usePageStore(state => state.toggleCreateTraitModal);
  const toggleDelete = usePageStore(state => state.toggleDeleteDialog);
  const toggleForm = usePageStore(state => state.toggleCreateTraitModal);
  const toggleVisability = useTraitsStore(state => state.toggleTraitVisability);

  const setFocusId = useTraitsStore(state => state.setFocusId);

  const setValues = useTraitFormStore(state => state.setValues);

  const handleEditTrait = (trait: TraitItemType) => {
    setValues(trait);
    toggleForm(true);
  }

  const handleDeleteClick = (id: number) => {
    setFocusId(id);
    toggleDelete();
  }

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
      <SimpleGrid columns={3} gapX={4} gapY={4}>
        {traits.map((trait, i) => (
          <Card.Root key={i}>
            <Box paddingX={4} paddingY={2}>
              <Card.Title>
                <Flex justifyContent='space-between'>
                  <Box>
                    <Text display="inline">
                      {trait.title}
                    </Text>
                    {' '}
                    {trait.draft
                      && (
                        <Text
                          display="inline"
                          fontWeight='light'
                          fontStyle="italic"
                          color='fg.subtle'
                        >
                          (черновик)
                        </Text>
                      )}
                  </Box>
                  <Group gap={2}>
                    <Tooltip content={trait.draft ? 'Показать трейт игрокам' : 'Скрыть трейт от игроков'} positioning={{ placement: 'top' }}>
                      <IconButton onClick={() => toggleVisability(trait.id, !trait.draft)} size='xs' variant='ghost' className="compact">
                        {trait.draft ? <LuEye /> : <LuEyeOff />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip content='Редактировать специализацию' positioning={{ placement: 'top' }}>
                      <IconButton onClick={() => handleEditTrait(trait)} size='xs' variant='ghost' className="compact"><LuPencil /></IconButton>
                    </Tooltip>
                    <Tooltip content='Удалить специализацию' positioning={{ placement: 'top' }}>
                      <IconButton onClick={() => handleDeleteClick(trait.id)} size='xs' variant='ghost' className="compact" colorPalette='red'><IoTrashOutline /></IconButton>
                    </Tooltip>
                  </Group>
                </Flex>
              </Card.Title>
              <Box spaceY={2} paddingY={2}>
                {trait.tags.map((tag, j) => (
                  <Flex key={`${tag.title}_${j}`} width='100%' gap={2}>
                    <Box>
                      <Center w={6} h={6}>
                        <LevelIcon level={tag.level} size={16} />
                      </Center>
                    </Box>
                    <Box flexGrow='1'>
                      <Text>{tag.title}</Text>
                      <Text fontSize='xs' fontStyle='italic'>{tag.description}</Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
              <Box>
                <Text><b>Связанный секрет:</b> {trait.secret.title}</Text>
              </Box>
            </Box>
          </Card.Root>
        ))}
      </SimpleGrid>
      <TraitForm />
      <DeleteDialog />
    </Box>
  )
}