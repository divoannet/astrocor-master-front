import { Box } from "@chakra-ui/react"
import { useNpcStore } from "@/store";
import { RollItem } from "./RollItem";

export const NpcRolls = () => {

  const rolls = useNpcStore(state => state.rolls);
  const setRoll = useNpcStore(state => state.setRoll);
  const customRollTitle = useNpcStore(state => state.customRollTitle);
  const setCustomRollTitle = useNpcStore(state => state.setCustomRollTitle);

  return (
    <Box>
      <RollItem
        label='Боевые'
        value={rolls.battle}
        onChange={(newValue) => setRoll('battle', newValue)}
        copy
      />
      <RollItem
        label='Интеллект'
        value={rolls.intellect}
        onChange={(newValue) => setRoll('intellect', newValue)}
        copy
      />
      <RollItem
        label='Технические'
        value={rolls.craft}
        onChange={(newValue) => setRoll('craft', newValue)}
        copy
      />
      <RollItem
        label='Физ. сопротивление'
        value={rolls.physical}
        onChange={(newValue) => setRoll('physical', newValue)}
        copy
      />
      <RollItem
        label='Социальные'
        value={rolls.social}
        onChange={(newValue) => setRoll('social', newValue)}
        copy
      />
      <RollItem
        label={`${customRollTitle}`}
        value={rolls.custom}
        onChange={(newValue) => setRoll('custom', newValue)}
        onLabelChange={setCustomRollTitle}
        copy
      />
    </Box>
  )
}