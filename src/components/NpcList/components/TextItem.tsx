import { Editable, Fieldset, IconButton, useEditable } from "@chakra-ui/react";
import { LuCheck, LuCopy, LuX } from "react-icons/lu";
import { useClipboard } from "@/hooks/useClipboard";
import { useEffect, useState } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
  labelProps?: {
    fontSize?: 'xl' | 'sm',
    fontWeight?: number,
  },
  multiline?: boolean;
  copy?: boolean;
}

export const TextItem = ({
  label,
  placeholder,
  value,
  onChange,
  labelProps,
  multiline = false,
  copy = false,
}: Props) => {
  const { copyToClipboard } = useClipboard();

  const [localValue, setLocalValue] = useState('');

  const edited = useEditable({
    submitMode: 'enter',
    defaultValue: "Click to edit",
    placeholder: placeholder || 'Двойное нажатие для редактирования',
    value: localValue,
    onValueChange: (e) => setLocalValue(e.value),
    onValueCommit: () => onChange(localValue),
    onValueRevert: () => setLocalValue(value),
    onInteractOutside: () => setLocalValue(value),
    activationMode: 'dblclick',
  });

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Fieldset.Root size="lg">
      {label && <Fieldset.Legend>{label}</Fieldset.Legend>}
      <Fieldset.Content marginTop={1}>
        <Editable.RootProvider
          value={edited}
        >
          <Editable.Preview className="field-preview" {...labelProps} />
          {multiline ? <Editable.Textarea /> : <Editable.Input />}
          <Editable.Control>
            {copy && !edited.editing && (
              <IconButton variant="ghost" size="xs" onClick={() => copyToClipboard(value)}>
                <LuCopy />
              </IconButton>
            )}
            <Editable.CancelTrigger asChild>
              <IconButton variant="outline" size="xs">
                <LuX />
              </IconButton>
            </Editable.CancelTrigger>
            <Editable.SubmitTrigger asChild>
              <IconButton variant="outline" size="xs">
                <LuCheck />
              </IconButton>
            </Editable.SubmitTrigger>
          </Editable.Control>
        </Editable.RootProvider>
      </Fieldset.Content>
    </Fieldset.Root >
  )
};