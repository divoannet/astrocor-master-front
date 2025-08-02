import { Box } from "@chakra-ui/react"
import type { TreeGroupItem } from "../NpcList/db/types";

interface Props {
  group: TreeGroupItem;
  onClick: (id: number) => void;
  activeGroup?: number;
  hideActiveGroup?: boolean;
}

export const TreeItem = ({ group, onClick, activeGroup, hideActiveGroup }: Props) => {
  const isEmpty = group.childern.length === 0;

  const handleClick = () => onClick(group.id);
  const active = activeGroup === group.id;
  const hidden = hideActiveGroup && active;

  return !hidden ? (
    <Box>
      <Box
        _hover={{ cursor: 'pointer', background: '#00000011' }}
        fontWeight={active ? 'bold' : 'normal'}
        onClick={handleClick}
        p={1}
      >
        {group.name}
      </Box>
      {!isEmpty && (
        <Box ml={4}>
          {group.childern.map(child => (
            <TreeItem key={child.id} group={child} onClick={onClick} activeGroup={activeGroup} hideActiveGroup={hideActiveGroup} />
          ))}
        </Box>
      )}
    </Box>
  ) : <></>
}