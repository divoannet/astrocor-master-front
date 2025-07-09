import { Badge, HStack, Text } from "@chakra-ui/react"
import { LuDices } from "react-icons/lu"
import { useClipboard } from "@/hooks/useClipboard";
import { useState } from "react";

interface Props {
  label: string;
  value: number;
}

export const RollItem = ({
  label,
  value,
}: Props) => {
  const { copyToClipboard } = useClipboard();
  const [hovered, setHovered] = useState(false)

  return (
    <HStack bg={hovered ? 'green.subtle' : 'transparent'} borderRadius='xl'>
      <Badge
        size="sm"
        borderRadius='xl'
        cursor='pointer'
        colorPalette="green"
        bg={hovered ? 'green.fg' : 'green.muted'}
        color={hovered ? 'green.contrast' : 'fg'}
        onClick={() => copyToClipboard(`/roll ${value}d6>4`)}
        onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
        minW={42}
        textAlign='center'
      >
        <LuDices size={10} />
        {value}
      </Badge>

      <Text textStyle="xs">
        {label}
      </Text>
    </HStack>
  )
}