import { IoTrashOutline } from "react-icons/io5";
import { Box, Card, Center, Flex, Group, IconButton, Text } from "@chakra-ui/react";
import { LuEye, LuEyeOff, LuPencil } from "react-icons/lu";
import { usePageStore, useTraitFormStore, useTraitsStore } from "@/store";
import type { TraitItemType } from "@/store/traits/types";
import { LevelIcon } from "../icons/LevelIcon";
import { Tooltip } from "../ui/tooltip";

interface Props {
  trait: TraitItemType;
}

export const TraitItem = ({ trait }: Props) => {
  const toggleVisability = useTraitsStore(state => state.toggleTraitVisability);
    const toggleDelete = usePageStore(state => state.toggleDeleteDialog);
    const toggleForm = usePageStore(state => state.toggleCreateTraitModal);
  
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
  
  return (
    <Card.Root>
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
  )
};