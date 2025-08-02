import { Box } from "@chakra-ui/react"
import type { TreeGroupItem } from "../../db/types"
import { useNpcStore } from "@/store";

export const TreeItem = ({ group, onClick }: { group: TreeGroupItem, onClick: (id: number) => void }) => {
  const groupId = useNpcStore(state => state.groupId);
  const isEmpty = group.childern.length === 0;

  const handleClick = () => onClick(group.id);

  return (
    <Box>
      <Box
        _hover={{ cursor: 'pointer', background: '#00000011' }}
        fontWeight={groupId === group.id ? 'bold' : 'normal'}
        onClick={handleClick}
        p={1}
      >
        {group.name}
      </Box>
      {!isEmpty && (
        <Box ml={4}>
          {group.childern.map(child => <TreeItem key={child.id} group={child} onClick={onClick} />)}
        </Box>
      )}
    </Box>
  )
}