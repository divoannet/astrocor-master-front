import { TextItem } from "../TextItem"
import { useNpcStore } from "@/store";

export const FieldName = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const name = useNpcStore(state => state.name);
  const setName = useNpcStore(state => state.setName);

  const handleChangeName = (value: string) => {
    setName(value);
    updateNpc();
  }

  return (
    <TextItem
      value={name}
      onChange={handleChangeName}
      labelProps={{
        fontSize: 'xl',
        fontWeight: 600,
      }}
      copy
    />
  )
}