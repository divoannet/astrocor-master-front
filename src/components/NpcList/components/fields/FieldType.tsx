import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldType = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const type = useNpcStore(state => state.type);
  const setType = useNpcStore(state => state.setType);

  const handleChangeType = (value: string) => {
    setType(value);
    updateNpc();
  }

  return (
    <TextItem
      value={type}
      onChange={handleChangeType}
      placeholder="Роль / тип"
      labelProps={{
        fontSize: 'sm',
      }}
    />
  )
}