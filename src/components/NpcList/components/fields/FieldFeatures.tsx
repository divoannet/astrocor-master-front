import { Card } from "@chakra-ui/react"
import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldFeatures = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const features = useNpcStore(state => state.features);
  const setFeatures = useNpcStore(state => state.setFeatures);

  const handleChangeFeatures = (value: string) => {
    setFeatures(value);
    updateNpc();
  }

  return (
    <Card.Root size='sm' className="info">
      <Card.Body>
        <TextItem
          label="Особенности в бою / переговорах / симпатии"
          value={features}
          onChange={handleChangeFeatures}
          multiline
        />
      </Card.Body>
    </Card.Root>
  )
}