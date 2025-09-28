import { useState } from "react";
import { TiFolder } from "react-icons/ti";
import { Field, Input, InputGroup } from "@chakra-ui/react"
import { useNpcStore } from "@/store";
import { useNpcFormStore } from "@/store/npcForm/store";
import { RegionPicker } from "@/components/RegionPicker";

export const RegionSelect = () => {
  const groupList = useNpcStore(state => state.groupList);
  const groupId = useNpcFormStore(state => state.groupId);
  const setGroupId = useNpcFormStore(state => state.setGroupId);

  const [edit, setEdit] = useState(false);

  const handleSelectGroup = async (newGroupId: number) => {
    setGroupId(newGroupId);
    setEdit(false);
  }

  const getRegion = () => {
    const getRoute = (regionId: number): string => {
      const region = groupList.find(group => group.id === regionId);
      if (!region) return '--';
      const isRoot = region.parentId === null;
      return isRoot ? region.name : `${getRoute(region.parentId as number)} » ${region.name}`;
    }

    const region = getRoute(groupId);
    return region;
  };

  return (
    <Field.Root>
      <Field.Label>Регион</Field.Label>
      <InputGroup startElement={<TiFolder />}>
        <Input width='100%' size="xs"  onClick={() => setEdit(true)} value={getRegion()} placeholder="Группа" />
      </InputGroup>
      <RegionPicker
        open={edit}
        onOpenChange={setEdit}
        onChange={handleSelectGroup}
        activeGroup={groupId}
      />
    </Field.Root>
  )
}