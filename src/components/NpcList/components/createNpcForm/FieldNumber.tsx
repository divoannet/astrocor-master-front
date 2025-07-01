import type { NpcStoreTypes } from "@/store/npcForm/types";
import { useNpcFormStore } from "@/store/npcForm/store"
import { Field, NumberInput } from "@chakra-ui/react"

interface Props {
  fieldName: keyof NpcStoreTypes;
  label: string;
}

export const FieldNumber = ({
  fieldName,
  label,
}: Props) => {
  const value = useNpcFormStore(state => state[fieldName]);
  const setFieldValue = useNpcFormStore(state => state.setFieldValue);

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <NumberInput.Root
        size='xs'
        value={value as string}
        width='100%'
        onValueChange={e => setFieldValue(fieldName, e.value)}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field.Root>
  )
}
