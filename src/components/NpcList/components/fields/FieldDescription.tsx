import { Card } from "@chakra-ui/react"
import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldDescription = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const description = useNpcStore(state => state.description);
  const setDescription = useNpcStore(state => state.setDescription);

  const handleChangeDescription = (value: string) => {
    setDescription(value);
    updateNpc();
  }

  return (
    <Card.Root size='sm' className="info">
      <Card.Body>
        <TextItem
          label="Описание персонажа"
          value={description}
          onChange={handleChangeDescription}
          multiline
        />
      </Card.Body>
    </Card.Root>
  )
}