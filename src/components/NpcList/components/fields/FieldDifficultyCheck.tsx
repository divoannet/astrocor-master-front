import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldDifficultyCheck = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const checkDifficulty = useNpcStore(state => state.checkDifficulty);
  const setCheckDifficulty = useNpcStore(state => state.setCheckDifficulty);

  const handleChangeDescription = (value: string) => {
    setCheckDifficulty(Number(value));
    updateNpc();
  }

  return (
    <TextItem
      label="Типичная сложность"
      value={`${checkDifficulty}`}
      onChange={handleChangeDescription}
    />
  )
}