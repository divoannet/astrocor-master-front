import { Card } from "@chakra-ui/react"
import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldRelation = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const relation = useNpcStore(state => state.relation);
  const setRelation = useNpcStore(state => state.setRelation);

  const handleChangeRelation = (value: string) => {
    setRelation(value);
    updateNpc();
  }

  return (
    <Card.Root size='sm' className="info">
      <Card.Body>
        <TextItem
          label="Отношение к игрокам"
          value={relation}
          onChange={handleChangeRelation}
          multiline
        />
      </Card.Body>
    </Card.Root>
  )
}