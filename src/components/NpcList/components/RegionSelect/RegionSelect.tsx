import { useNpcStore } from "@/store";
import { Badge } from "@chakra-ui/react"
import { useState } from "react";
import { RegionPicker } from "@/components/RegionPicker";

export const RegionSelect = () => {
  const region = useNpcStore(state => state.region);
  const groupId = useNpcStore(state => state.groupId);
  const setGroupId = useNpcStore(state => state.setGroupId);
  const updateNpc = useNpcStore(state => state.updateNpc);
  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const [edit, setEdit] = useState(false);

  const handleSelectGroup = async (newGroupId: number) => {
    const confirm = window.confirm('Переместить персонажа?');
    if (confirm) {
      setGroupId(newGroupId);
      await updateNpc();
      await loadNpcList();
    }
    setEdit(false);
  }

  return <div>
    <Badge _hover={{ cursor: 'pointer' }} onDoubleClick={() => setEdit(true)}>{region}</Badge>
    <RegionPicker
      open={edit}
      onOpenChange={setEdit}
      onChange={handleSelectGroup}
      activeGroup={groupId}
    />
  </div>
}
