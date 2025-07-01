import type { NpcStoreTypes } from "@/store/npcForm/types";
import { useNpcFormStore } from "@/store/npcForm/store"
import { Field, Input, Textarea } from "@chakra-ui/react"

interface Props {
  fieldName: keyof NpcStoreTypes;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

export const TextField = ({
  fieldName,
  placeholder,
  label,
  multiline,
}: Props) => {
  const value = useNpcFormStore(state => state[fieldName]);
  const setFieldValue = useNpcFormStore(state => state.setFieldValue);

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      {multiline ? (
        <Textarea
          variant="outline"
          size='xs'
          value={value as string}
          onChange={e => setFieldValue(fieldName, e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <Input
          size='xs'
          value={value as string}
          onChange={e => setFieldValue(fieldName, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </Field.Root>
  )
}
