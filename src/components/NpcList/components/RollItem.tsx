import { Box, HStack, IconButton, NumberInput } from "@chakra-ui/react"
import { LuCopy } from "react-icons/lu"
import { useClipboard } from "@/hooks/useClipboard";

interface Props {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
}

export const RollItem = ({
  label,
  value,
  onChange
}: Props) => {
  const { copyToClipboard } = useClipboard();

  return (
    <HStack padding={2}>
      <Box width="180px">
        {label}
      </Box>
      <NumberInput.Root value={`${value}`} onValueChange={(e) => onChange(Number(e.value) || 0)} width="80px">
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <IconButton variant="ghost" size="xs" onClick={() => copyToClipboard(`/roll ${value}d6>4`)}>
        <LuCopy />
      </IconButton>
    </HStack>
  )
}