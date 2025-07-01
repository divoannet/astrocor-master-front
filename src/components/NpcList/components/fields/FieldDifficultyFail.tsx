import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldDifficultyFail = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const checkFailure = useNpcStore(state => state.checkFailure);
  const setCheckFailure = useNpcStore(state => state.setCheckFailure);

  const handleChangeCheckFailure = (value: string) => {
    setCheckFailure(value);
    updateNpc();
  }

  return (
    <TextItem
      label="Возможные последствия провала"
      value={checkFailure}
      onChange={handleChangeCheckFailure}
      multiline
    />
  )
}