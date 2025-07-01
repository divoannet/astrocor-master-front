import { useNpcStore } from "@/store";
import { useNpcFormStore } from "@/store/npcForm/store";
import { Box, Field, Input, Popover } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export const RegionSelect = () => {
  const region = useNpcFormStore(state => state.region);
  const setRegion = useNpcFormStore(state => state.setRegion);
  const regionList = useNpcStore(state => state.regionList);

  const [regions, setRegions] = useState<string[]>([]);
  const [filterRegions, setFilterRegions] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setFilterRegions(regions.filter(item => item.includes(region)))
  }, [region]);

  useEffect(() => {
    setRegions(Object.keys(regionList));
  }, [regionList]);

  return (
    <Field.Root>
      <Field.Label>Регион</Field.Label>
      <Input
        width='100%'
        value={region}
        size="xs"
        onChange={e => setRegion(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <Popover.Root
        open={focus} autoFocus={false}
        positioning={{ offset: { crossAxis: 200, mainAxis: 0 } }}
      >
        <Popover.Trigger>
          <Box></Box>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Box className="region-list">
              {filterRegions.map(region => (
                <Box key={region} className="region-item" onClick={() => setRegion(region)}>{region}</Box>
              ))}
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Field.Root>
  )
}