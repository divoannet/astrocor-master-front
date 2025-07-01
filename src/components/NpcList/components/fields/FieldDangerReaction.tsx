import { Card } from "@chakra-ui/react"
import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldDangerReaction = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const danger = useNpcStore(state => state.danger);
  const setDanger = useNpcStore(state => state.setDanger);

  const handleChangeDanger = (value: string) => {
    setDanger(value);
    updateNpc();
  }

  return (
    <Card.Root size='sm' className="info">
      <Card.Body>
        <TextItem
          label="Как реагирует на угрозу"
          value={danger}
          onChange={handleChangeDanger}
          multiline
        />
      </Card.Body>
    </Card.Root>
  )
}