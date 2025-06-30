import { useNpcStore } from "@/store";
import { Box } from "@chakra-ui/react"
import { TextItem } from "./TextItem";
import { RollItem } from "./RollItem";

export const NpcHabits = () => {
  const danger = useNpcStore(state => state.danger);
  const setDanger = useNpcStore(state => state.setDanger);

  const features = useNpcStore(state => state.features);
  const setFeatures = useNpcStore(state => state.setFeatures);

  const triggers = useNpcStore(state => state.triggers);
  const setTriggers = useNpcStore(state => state.setTriggers);

  const checkDifficulty = useNpcStore(state => state.checkDifficulty);
  const setCheckDifficulty = useNpcStore(state => state.setCheckDifficulty);

  const checkFailure = useNpcStore(state => state.checkFailure);
  const setCheckFailure = useNpcStore(state => state.setCheckFailure);

  return (
    <Box spaceY={8}>
      <TextItem
        label="Как реагирует на угрозу"
        value={danger}
        onChange={setDanger}
        multiline
      />

      <TextItem
        label="Особенности в бою / переговорах / симпатии"
        value={features}
        onChange={setFeatures}
        multiline
      />

      <TextItem
        label="Что выводит из равновесия"
        value={triggers}
        onChange={setTriggers}
        multiline
      />

      <hr />

      <RollItem
        value={checkDifficulty}
        onChange={setCheckDifficulty}
        label="Типичная сложность при взаимодействии"
      />

      <TextItem
        label="Возможные последствия провала"
        value={checkFailure}
        onChange={setCheckFailure}
        multiline
      />
    </Box>
  )
}