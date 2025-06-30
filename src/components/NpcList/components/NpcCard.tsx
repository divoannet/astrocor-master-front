import { Card, Popover, Image, Input, Box, Field } from "@chakra-ui/react"
import defaultAvatar from '@/assets/default_avatar.png';
import { useNpcStore } from "@/store";
import { TextItem } from "./TextItem";

export const NpcCard = () => {

  const image = useNpcStore(state => state.image);
  const setImage = useNpcStore(state => state.setImage);

  const name = useNpcStore(state => state.name);
  const setName = useNpcStore(state => state.setName);

  const type = useNpcStore(state => state.type);
  const setType = useNpcStore(state => state.setType);

  const goal = useNpcStore(state => state.goal);
  const setGoal = useNpcStore(state => state.setGoal);

  return (
    <Card.Root gap={4} flexDirection="row" overflow="hidden">
      <Popover.Root positioning={{ placement: "left" }}>
        <Popover.Trigger>
          <Image objectFit="cover" w="120px" maxH="200px" src={image || defaultAvatar} />
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.CloseTrigger />
            <Popover.Arrow />
            <Popover.Body>
              <Field.Root required>
                <Field.Label>Ссылка на изображение</Field.Label>
                <Input placeholder="Ссылка на изображение" value={image} onChange={e => setImage(e.target.value)} />
              </Field.Root>
              
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
      <Box>
        <Card.Body padding={2}>
          <TextItem
            value={name}
            onChange={setName}
            labelProps={{
              fontSize: 'xl',
              fontWeight: 600,
            }}
            copy
          />
          <TextItem
            value={type}
            onChange={setType}
            placeholder="Роль / тип"
            labelProps={{
              fontSize: 'sm',
            }}
          />

          <TextItem
            value={goal}
            onChange={setGoal}
            placeholder="Цель"
            multiline
          />

        </Card.Body>
      </Box>
    </Card.Root>
  )
}