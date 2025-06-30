import { useNpcStore } from "@/store";
import { Box } from "@chakra-ui/react"
import { TextItem } from "./TextItem";

export const NpcHabits = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const danger = useNpcStore(state => state.danger);
  const setDanger = useNpcStore(state => state.setDanger);

  const handleChangeDanger = (value: string) => {
    setDanger(value);
    updateNpc();
  }

  const features = useNpcStore(state => state.features);
  const setFeatures = useNpcStore(state => state.setFeatures);

  const handleChangeFeatures = (value: string) => {
    setFeatures(value);
    updateNpc();
  }

  const triggers = useNpcStore(state => state.triggers);
  const setTriggers = useNpcStore(state => state.setTriggers);

  const handleChangeTriggers = (value: string) => {
    setTriggers(value);
    updateNpc();
  }

  return (
    <Box spaceY={8}>
      <TextItem
        label="Как реагирует на угрозу"
        value={danger}
        onChange={handleChangeDanger}
        multiline
      />

      <TextItem
        label="Особенности в бою / переговорах / симпатии"
        value={features}
        onChange={handleChangeFeatures}
        multiline
      />

      <TextItem
        label="Что выводит из равновесия"
        value={triggers}
        onChange={handleChangeTriggers}
        multiline
      />
    </Box>
  )
}