import { Box } from "@chakra-ui/react"
import { useNpcStore } from "@/store";
import { RollItem } from "./RollItem";

export const NpcRolls = () => {

  const rolls = useNpcStore(state => state.rolls);
  const setRoll = useNpcStore(state => state.setRoll);
  const customRollTitle = useNpcStore(state => state.customRollTitle);

  return (
    <Box>
      <RollItem
        label='Боевые:'
        value={rolls.battle}
        onChange={(newValue) => setRoll('battle', newValue)}
      />
      <RollItem
        label='Интеллект:'
        value={rolls.intellect}
        onChange={(newValue) => setRoll('intellect', newValue)}
      />
      <RollItem
        label='Технические:'
        value={rolls.craft}
        onChange={(newValue) => setRoll('craft', newValue)}
      />
      <RollItem
        label='Физ. сопротивление:'
        value={rolls.physical}
        onChange={(newValue) => setRoll('physical', newValue)}
      />
      <RollItem
        label='Социальные:'
        value={rolls.social}
        onChange={(newValue) => setRoll('social', newValue)}
      />
      <RollItem
        label={`${customRollTitle}:`}
        value={rolls.custom}
        onChange={(newValue) => setRoll('custom', newValue)}
      />
    </Box>
  )
}