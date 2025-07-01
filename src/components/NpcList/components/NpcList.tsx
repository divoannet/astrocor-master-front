import { useNpcStore, usePageStore } from "@/store";
import { Accordion, Box, Button, Card, Image, Spacer } from "@chakra-ui/react";
import defaultAvatar from '@/assets/default_avatar.png';
import { CreateNpcForm } from "./createNpcForm";

export const NpcList = () => {
  const setActiveId = useNpcStore(state => state.setActiveId);
  const regionList = useNpcStore(state => state.regionList);
  const npcId = useNpcStore(state => state.id);
  const checkedRegion = useNpcStore(state => state.checkedRegion);
  const setCheckedRegion = useNpcStore(state => state.setCheckedRegion);

  const toggleCreateModal = usePageStore(state => state.toggleCreateNpcModal);

  return (
    <Box spaceY={4} scrollBehavior='auto'>
      <Button
        onClick={() => toggleCreateModal(true)}
        variant='outline'
        width='100%'
      >
        Создать перонажа
      </Button>
      <CreateNpcForm />
      <Accordion.Root
        variant='enclosed'
        collapsible value={[checkedRegion]}
        onValueChange={details => setCheckedRegion(details.value[0])}
      >
        {Object.entries(regionList).map(([region, items]) => {
          return (
            <Accordion.Item key={region} value={region}>
              <Accordion.ItemTrigger cursor='pointer'>{region}</Accordion.ItemTrigger>
              <Accordion.ItemContent spaceY={4}>
                <Spacer h={1} />
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
                <Spacer h={1} />
              </Accordion.ItemContent>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </Box>
  )
}