import { Box, Card, Group, IconButton, Spacer, Text } from "@chakra-ui/react"
import { useNpcStore, usePageStore } from "@/store";
import { ImagePopover } from "./ImagePopover";
import { RegionSelect } from "./RegionSelect/RegionSelect";
import { RollItem } from "./RollItem";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { FieldName } from "./fields/FieldName";
import { FieldType } from "./fields/FieldType";
import { FieldGoal } from "./fields/FieldGoal";
import { RollForm } from "./RollForm";

export const NpcCard = () => {

  const rolls = useNpcStore(state => state.rolls);
  const customRollTitle = useNpcStore(state => state.customRollTitle);

  const toggleSettings = usePageStore(state => state.toggleRollsSettingDialog);

  return (
    <Group attached alignItems="stretch" width='100%'>
      <Card.Root gap={4} flexDirection="row" overflow="hidden" flexGrow={1}  width='60%'>
        <ImagePopover />
        <Card.Body padding={2}>
          <FieldName />
          <RegionSelect />
          <FieldType />
          <FieldGoal />
        </Card.Body>
      </Card.Root>
      <Card.Root width='40%'>
        <Card.Body padding='2'>
          <Text>Броски <IconButton onClick={() => toggleSettings(true)} variant='ghost' className="compact" size='sm'><HiOutlineCog6Tooth /></IconButton></Text>
          <Spacer h={4} />
          <Box spaceY={1}>
            <RollItem
              label='Боевые'
              value={rolls.battle}
            />
            <RollItem
              label='Интеллект'
              value={rolls.intellect}
            />
            <RollItem
              label='Технические'
              value={rolls.craft}
            />
            <RollItem
              label='Физ. сопротивление'
              value={rolls.physical}
            />
            <RollItem
              label='Социальные'
              value={rolls.social}
            />
            <RollItem
              label={customRollTitle}
              value={rolls.custom}
            />
          </Box>
          <RollForm />
        </Card.Body>
      </Card.Root>
    </Group>
  )
}