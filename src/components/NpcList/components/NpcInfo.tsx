import { useNpcStore } from "@/store";
import { Box } from "@chakra-ui/react"
import { TextItem } from "./TextItem";

export const NpcInfo = () => {
  const description = useNpcStore(state => state.description);
  const setDescription = useNpcStore(state => state.setDescription);

  const relation = useNpcStore(state => state.relation);
  const setRelation = useNpcStore(state => state.setRelation);

  return (
    <Box spaceY={8}>
      <TextItem
        label="Описание персонажа"
        value={description}
        onChange={setDescription}
        multiline
      />
      

      <TextItem
        label="Отношение к игрокам"
        value={relation}
        onChange={setRelation}
        multiline
      />
    </Box>
  )
}