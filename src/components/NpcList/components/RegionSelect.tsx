import { useNpcStore } from "@/store";
import { Badge, Box, Field, Group, IconButton, Input, Popover, Portal } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

export const RegionSelect = () => {
  const region = useNpcStore(state => state.region);
  const setRegion = useNpcStore(state => state.setRegion);
  const regionList = useNpcStore(state => state.regionList);
  const updateNpc = useNpcStore(state => state.updateNpc);
  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const [regions, setRegions] = useState<string[]>([]);
  const [filterRegions, setFilterRegions] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);

  const handleRevert = () => {
    setValue(region);
    setEdit(false);
  }

  const handleSave = async () => {
    setRegion(value);
    setEdit(false);
    await updateNpc();
    await loadNpcList();
  }

  useEffect(() => {
    setValue(region);
  }, [region]);

  useEffect(() => {
    setFilterRegions(regions.filter(item => item.includes(value)))
  }, [value]);

  useEffect(() => {
    setRegions(Object.keys(regionList));
  }, [regionList]);

  return edit ? (
    <Field.Root>
      <Group gap="xs">
        <Input
          value={value}
          size="xs"
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <IconButton size='xs' variant='outline' onClick={handleRevert}>
          <LuX />
        </IconButton>
        <IconButton size='xs' variant='outline' onClick={handleSave}>
          <LuCheck />
        </IconButton>
      </Group>
      <Popover.Root open={focus} autoFocus={false} positioning={{ placement: 'bottom-start' }}>
        <Popover.Trigger>
          <Box></Box>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Box className="region-list">
                {filterRegions.map(region => (
                  <Box className="region-item" onClick={() => setValue(region)}>{region}</Box>
                ))}
              </Box>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Field.Root>
  ) : (
    <div><Badge onDoubleClick={() => setEdit(true)}>{region}</Badge></div>
  )
}