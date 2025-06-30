import { Box, GridItem, SimpleGrid } from "@chakra-ui/react"
import { useNpcStore } from "@/store";
import { RollItem } from "./RollItem";
import { TextItem } from "./TextItem";

export const NpcRolls = () => {

  const rolls = useNpcStore(state => state.rolls);
  const setRoll = useNpcStore(state => state.setRoll);
  const customRollTitle = useNpcStore(state => state.customRollTitle);
  const setCustomRollTitle = useNpcStore(state => state.setCustomRollTitle);

  const updateNpc = useNpcStore(state => state.updateNpc);

  const handleChangeRollTitle = (value: string) => {
    setCustomRollTitle(value);
    updateNpc();
  }

  const handleBlur = () => {
    updateNpc();
  }

  const checkDifficulty = useNpcStore(state => state.checkDifficulty);
  const setCheckDifficulty = useNpcStore(state => state.setCheckDifficulty);

  const checkFailure = useNpcStore(state => state.checkFailure);
  const setCheckFailure = useNpcStore(state => state.setCheckFailure);

  const handleChangeCheckFailure = (value: string) => {
    setCheckFailure(value);
    updateNpc();
  }

  return (
    <SimpleGrid columns={{ base: 6 }} gap={{ base: "24px", md: "40px" }}>
      <GridItem colSpan={{ base: 5, md: 2 }}>
        <RollItem
          label='Боевые'
          value={rolls.battle}
          onChange={(newValue) => setRoll('battle', newValue)}
          onBlur={handleBlur}
          copy
        />
        <RollItem
          label='Интеллект'
          value={rolls.intellect}
          onChange={(newValue) => setRoll('intellect', newValue)}
          onBlur={handleBlur}
          copy
        />
        <RollItem
          label='Технические'
          value={rolls.craft}
          onChange={(newValue) => setRoll('craft', newValue)}
          onBlur={handleBlur}
          copy
        />
        <RollItem
          label='Физ. сопротивление'
          value={rolls.physical}
          onChange={(newValue) => setRoll('physical', newValue)}
          onBlur={handleBlur}
          copy
        />
        <RollItem
          label='Социальные'
          value={rolls.social}
          onChange={(newValue) => setRoll('social', newValue)}
          onBlur={handleBlur}
          copy
        />
        <RollItem
          label={`${customRollTitle}`}
          value={rolls.custom}
          onChange={(newValue) => setRoll('custom', newValue)}
          onLabelChange={handleChangeRollTitle}
          onBlur={handleBlur}
          copy
        />
      </GridItem>
      <GridItem colSpan={{ base: 5, md: 4 }}>
        <Box spaceY={8}>
          <RollItem
            value={checkDifficulty}
            onChange={setCheckDifficulty}
            label="Типичная сложность при взаимодействии"
            onBlur={handleBlur}
          />

          <TextItem
            label="Возможные последствия провала"
            value={checkFailure}
            onChange={handleChangeCheckFailure}
            multiline
          />
        </Box>
      </GridItem>
    </SimpleGrid>
  )
}