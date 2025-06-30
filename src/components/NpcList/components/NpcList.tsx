import { useNpcStore } from "@/store";
import { Accordion, Box, Card, Image, Spacer } from "@chakra-ui/react";
import defaultAvatar from '@/assets/default_avatar.png';

export const NpcList = () => {
  const setActiveId = useNpcStore(state => state.setActiveId);
  const regionList = useNpcStore(state => state.regionList);
  const npcId = useNpcStore(state => state.id);
  const checkedRegion = useNpcStore(state => state.checkedRegion);
  const setCheckedRegion = useNpcStore(state => state.setCheckedRegion);

  return (
    <Box spaceY={4} scrollBehavior='auto'>
      <Accordion.Root
        variant='enclosed'
        collapsible value={[checkedRegion]}
        onValueChange={details => setCheckedRegion(details.value[0])}
      >
        {Object.entries(regionList).map(([region, items]) => {
          return (
            <Accordion.Item key={region} value={region}>
              <Accordion.ItemTrigger>{region}</Accordion.ItemTrigger>
              <Accordion.ItemContent spaceY={4}>
                {items.map(npc => (
                  <Card.Root
                    key={npc.id}
                    flexDirection="row"
                    alignItems="center"
                    overflow="hidden"
                    size="sm"
                    className="npc-list-item"
                    bg={npcId === npc.id ? "green" : "bg"}
                    onClick={() => setActiveId(npc.id)}
                  >
                    <Image
                      objectFit="cover"
                      width="40px"
                      height="40px"
                      src={npc.image || defaultAvatar}
                    />
                    <Box className="npc-list">
                      <Card.Body padding={2}>
                        {npc.name}
                      </Card.Body>
                    </Box>
                  </Card.Root>
                ))}
                <Spacer h={4} />
              </Accordion.ItemContent>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </Box>
  )
}