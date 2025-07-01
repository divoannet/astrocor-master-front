import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldGoal = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const goal = useNpcStore(state => state.goal);
  const setGoal = useNpcStore(state => state.setGoal);

  const handleChangeGoal = (value: string) => {
    setGoal(value);
    updateNpc();
  }

  return (
    <TextItem
      value={goal}
      onChange={handleChangeGoal}
      placeholder="Цель"
      multiline
    />
  )
}