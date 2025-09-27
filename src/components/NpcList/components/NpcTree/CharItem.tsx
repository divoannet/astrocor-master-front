import { useNpcStore } from "@/store";
import type { NpcStoreTypes } from "@/store/npc/types"
import { Flex, Image} from "@chakra-ui/react"
import defaultAvatar from '@/assets/default_avatar.png';

export const CharItem = ({ char }: { char: NpcStoreTypes }) => {
  const activeId = useNpcStore(state => state.activeId);
  const setActiveId = useNpcStore(state => state.setActiveId);

  return (
    <Flex
      key={char.id}
      fontWeight={char.id === activeId ? '700' : '300'}
      color={char.id === activeId ? '#3f4d3f' : 'dark'}
      cursor='pointer'
      onClick={() => setActiveId(char.id)}
      alignContent='baseline'
      gap='12px'
      p={1}
    >
      <Image
        w='24px'
        h='24px'
        borderRadius='2xl'
        src={char.image || defaultAvatar}
        border='solid 1px'
      />
      {char.name}
    </Flex>
  )
}