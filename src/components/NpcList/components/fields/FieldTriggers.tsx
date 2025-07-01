import { Card } from "@chakra-ui/react"
import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldTriggers = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const triggers = useNpcStore(state => state.triggers);
  const setTriggers = useNpcStore(state => state.setTriggers);

  const handleChangeTriggers = (value: string) => {
    setTriggers(value);
    updateNpc();
  }

  return (
    <Card.Root size='sm' className="info">
      <Card.Body>
        <TextItem
          label="Что выводит из равновесия"
          value={triggers}
          onChange={handleChangeTriggers}
          multiline
        />
      </Card.Body>
    </Card.Root>
  )
}