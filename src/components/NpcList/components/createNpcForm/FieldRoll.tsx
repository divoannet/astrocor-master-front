import type { NpcStoreTypes } from "@/store/npcForm/types";
import { useNpcFormStore } from "@/store/npcForm/store"
import { Field, Input, NumberInput, VStack } from "@chakra-ui/react"

interface Props {
  fieldName: keyof NpcStoreTypes['rolls'];
  label: string;
  custom?: boolean;
}

export const FieldRoll = ({
  fieldName,
  label,
  custom,
}: Props) => {
  const value = useNpcFormStore(state => state.rolls[fieldName]);
  const setRolls = useNpcFormStore(state => state.setRolls);

  const customRollTitle = useNpcFormStore(state => state.customRollTitle);
  const setCustomRollTitle = useNpcFormStore(state => state.setCustomRollTitle);

  return (
    <VStack>
      {custom && (
        <Input
          size='xs'
          value={customRollTitle}
          onChange={e => setCustomRollTitle(e.target.value)}
        />
      )}
      <Field.Root>
        {!custom && (
          <Field.Label>{label}</Field.Label>
        )}
        <NumberInput.Root
          size='xs'
          value={value}
          width='100%'
          onValueChange={e => setRolls({ [fieldName]: e.value })}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </Field.Root>
    </VStack>
  )
}
