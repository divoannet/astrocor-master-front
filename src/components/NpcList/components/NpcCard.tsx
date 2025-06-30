import { Card } from "@chakra-ui/react"
import { useNpcStore } from "@/store";
import { TextItem } from "./TextItem";
import { ImagePopover } from "./ImagePopover";

export const NpcCard = () => {

  const updateNpc = useNpcStore(state => state.updateNpc);

  const name = useNpcStore(state => state.name);
  const setName = useNpcStore(state => state.setName);

  const handleChangeName = (value: string) => {
    setName(value);
    updateNpc();
  }

  const type = useNpcStore(state => state.type);
  const setType = useNpcStore(state => state.setType);

  const handleChangeType = (value: string) => {
    setType(value);
    updateNpc();
  }

  const goal = useNpcStore(state => state.goal);
  const setGoal = useNpcStore(state => state.setGoal);

  const handleChangeGoal = (value: string) => {
    setGoal(value);
    updateNpc();
  }

  return (
    <Card.Root gap={4} flexDirection="row" overflow="hidden">
      <ImagePopover />
      <Card.Body padding={2}>
        <TextItem
          value={name}
          onChange={handleChangeName}
          labelProps={{
            fontSize: 'xl',
            fontWeight: 600,
          }}
          copy
        />
        <TextItem
          value={type}
          onChange={handleChangeType}
          placeholder="Роль / тип"
          labelProps={{
            fontSize: 'sm',
          }}
        />

        <TextItem
          value={goal}
          onChange={handleChangeGoal}
          placeholder="Цель"
          multiline
        />

      </Card.Body>
    </Card.Root>
  )
}