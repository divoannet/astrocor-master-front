import { useNpcStore } from "@/store";
import { Box } from "@chakra-ui/react"
import { TextItem } from "./TextItem";

export const NpcInfo = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const description = useNpcStore(state => state.description);
  const setDescription = useNpcStore(state => state.setDescription);

  const handleChangeDescription = (value: string) => {
    setDescription(value);
    updateNpc();
  }

  const relation = useNpcStore(state => state.relation);
  const setRelation = useNpcStore(state => state.setRelation);

  const handleChangeRelation = (value: string) => {
    setRelation(value);
    updateNpc();
  }

  return (
    <Box spaceY={8}>
      <TextItem
        label="Описание персонажа"
        value={description}
        onChange={handleChangeDescription}
        multiline
      />
      
      <TextItem
        label="Отношение к игрокам"
        value={relation}
        onChange={handleChangeRelation}
        multiline
      />
    </Box>
  )
}