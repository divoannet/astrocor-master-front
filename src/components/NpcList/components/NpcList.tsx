import { useNpcStore } from "@/store";
import { Box, Card, Image } from "@chakra-ui/react";
import defaultAvatar from '@/assets/default_avatar.png';

export const NpcList = () => {
  const loadNpc = useNpcStore(state => state.loadNpc);
  const npcList = useNpcStore(state => state.npcList);
  const npcId = useNpcStore(state => state.id);

  return (
    <Box spaceY={4} scrollBehavior='auto'>
      {npcList.map(npc => (
        <Card.Root
          key={npc.id}
          flexDirection="row"
          alignItems="center"
          overflow="hidden"
          size="sm"
          className="npc-list-item"
          bg={npcId === npc.id ? "green" : "bg"}
          onClick={() => loadNpc(npc.id)}
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
    </Box>
  )
}