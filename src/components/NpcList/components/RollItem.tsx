import { Box, Field, Group, HStack, IconButton, Input, NumberInput, Popover } from "@chakra-ui/react"
import { LuCheck, LuCopy, LuPencilLine } from "react-icons/lu"
import { useClipboard } from "@/hooks/useClipboard";
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";

interface Props {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onLabelChange?: (newValue: string) => void;
  copy?: boolean;
}

export const RollItem = ({
  label,
  value,
  onChange,
  onBlur,
  onLabelChange,
  copy,
}: Props) => {
  const { copyToClipboard } = useClipboard();
  const [localLabel, setLocalLabel] = useState('')
  const [open, setOpen] = useState(false)

  const handleSaveLabel = () => {
    onLabelChange && onLabelChange(localLabel);
    setOpen(false);
  }

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalLabel(event.target.value)
  }

  const resetLabel = () => {
    setLocalLabel(label);
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event);
  }

  useEffect(() => {
    setLocalLabel(label)
  }, [label]);

  return (
    <HStack padding={2}>
      <Box minW="180px">
        {label}
        {Boolean(onLabelChange) && (
          <Popover.Root positioning={{ placement: 'top' }} open={open} onInteractOutside={resetLabel} onOpenChange={(e) => setOpen(e.open)}>
            <Popover.Trigger asChild>
              <IconButton size='xs' variant='ghost'>
                <LuPencilLine />
              </IconButton>
            </Popover.Trigger>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.CloseTrigger />
                <Popover.Arrow />
                <Popover.Body>
                  <Field.Root required>
                    <Field.Label>Название кастомной проверки</Field.Label>
                    <Group gap="xs">
                      <Input placeholder="Кастомная проверка" value={localLabel} onChange={handleLabelChange} />
                      <IconButton onClick={handleSaveLabel}><LuCheck /></IconButton>
                    </Group>
                  </Field.Root>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Root>
        )}
      </Box>
      <NumberInput.Root
        value={`${value}`}
        onValueChange={(e) => onChange(Number(e.value) || 0)}
        width="80px"
        onBlur={handleBlur}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      {copy && (
        <IconButton variant="ghost" size="xs" onClick={() => copyToClipboard(`/roll ${value}d6>4`)}>
          <LuCopy />
        </IconButton>
      )}
    </HStack>
  )
}