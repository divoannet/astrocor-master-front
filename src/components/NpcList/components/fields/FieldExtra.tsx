import { Card } from "@chakra-ui/react"
import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldExtra = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const extra = useNpcStore(state => state.extra);
  const setExtra = useNpcStore(state => state.setExtra);

  const handleChangeExtra = (value: string) => {
    setExtra(value);
    updateNpc();
  }

  return (
    <Card.Root size='sm' className="info">
      <Card.Body>
        <TextItem
          label="Дополнительно"
          value={extra}
          onChange={handleChangeExtra}
          multiline
        />
      </Card.Body>
    </Card.Root>
  )
}