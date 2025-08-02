import { useEffect, useState, type MouseEvent } from "react";
import { Box, Image, Center, Flex, IconButton, Menu, Portal, Stack, type MenuSelectionDetails, Text, Editable } from "@chakra-ui/react";
import { TiFolder, TiFolderOpen } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";
import { CgReorder } from "react-icons/cg";
import { LuCheck, LuFolderInput, LuFolderMinus, LuFolderPlus, LuTextCursorInput, LuUserPlus, LuX } from "react-icons/lu";

import { useNpcStore, usePageStore } from "@/store";
import type { TreeGroupItem } from "../db/types";
import { useNpcFormStore } from "@/store/npcForm/store";
import defaultAvatar from '@/assets/default_avatar.png';

interface Props {
  group: TreeGroupItem;
  depth: number;
}

export const NpcTreeItem = ({ group, depth }: Props) => {
  const [edit, setEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const list = useNpcStore(state => state.npcList);
  const loadNpcList = useNpcStore(state => state.loadNpcList);
  const activeId = useNpcStore(state => state.activeId);
  const setActiveId = useNpcStore(state => state.setActiveId);
  const groupId = useNpcStore(state => state.groupId);
  const updateFolder = useNpcStore(state => state.updateFolder);
  const addFolder = useNpcStore(state => state.addFolder);
  const removeFolder = useNpcStore(state => state.removeFolder);
  const toggleFolder = useNpcStore(state => state.toggleFolder);

  const setFormGroupId = useNpcFormStore(state => state.setGroupId);

  const toggleCreateNpcModal = usePageStore(state => state.toggleCreateNpcModal);

  const chars = list.filter(item => item.groupId === group.id);

  const isGroupChecked = groupId === group.id;
  const isEmpty = group.childern.length === 0 && chars.length === 0;

  const handleMenuSelect = (details: MenuSelectionDetails) => {
    switch (details.value) {
      case 'new-char':
        setFormGroupId(group.id);
        toggleCreateNpcModal(true);
        break;
      case 'rename-folder':
        setEdit(true);
        break;
      case 'reorder-folder':
        break;
      case 'new-folder':
        addFolder(group.id);
        break;
      case 'move-folder':
        break;
      case 'delete-folder':
        const confirmed = window.confirm('Удалить группу и все вложенные? Все персонажи переместятся в родительскую группу.');
        if (!confirmed) return;
        removeFolder(group.id);
        break;
    }
  }

  const handleSaveName = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();

    updateFolder({
      ...group,
      name: groupName,
    });
    setEdit(false);
  }

  const handleResetName = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setGroupName(group.name);
    setEdit(false);
  }

  const handleItemClick = async (event?: MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    await toggleFolder(group.id);
    await loadNpcList();
  }

  useEffect(() => {
    setGroupName(group.name);
  }, [group]);

  return (
    <Box borderRadius='md' background={isGroupChecked ? '#86786142' : 'transparent'}>
      <Flex
        cursor='pointer'
        alignContent='center'
        gap={2}
      >
        <Box>
          <Center
            w={6} height={6}
            onClick={handleItemClick}
          >
            {group.open
              ? <TiFolderOpen />
              : <TiFolder />}
          </Center>
        </Box>
        <Box flexGrow={1}>
          <Editable.Root
            value={groupName}
            onValueChange={e => setGroupName(e.value)}
            edit={edit}
            defaultValue="Новая группа"
            activationMode="none"
            autoFocus
            size='sm'
          >
            <Editable.Preview
              _hover={{ bg: 'none', cursor: 'pointer' }}
            />
            <Editable.Input />
            <Editable.Control>
              <Editable.SubmitTrigger asChild>
                <IconButton onClick={handleSaveName} variant="ghost" size="xs">
                  <LuCheck />
                </IconButton>
              </Editable.SubmitTrigger>
              <Editable.CancelTrigger asChild>
                <IconButton onClick={handleResetName} variant="ghost" size="xs">
                  <LuX />
                </IconButton>
              </Editable.CancelTrigger>
            </Editable.Control>
          </Editable.Root>
        </Box>
        <Box>
          <Menu.Root onSelect={handleMenuSelect}>
            <Menu.Trigger asChild>
              <IconButton size='xs' variant='ghost'><HiDotsVertical /></IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="new-char"
                  >
                    <LuUserPlus /> Добавить персонажа
                  </Menu.Item>
                  <Menu.Item value="rename-folder">
                    <LuTextCursorInput /> Переименовать группу
                  </Menu.Item>
                  {depth < 3 && (
                    <Menu.Item value="new-folder">
                      <LuFolderPlus /> Добавить вложенную группу
                    </Menu.Item>
                  )}
                  {group.childern.length > 1 && (
                    <Menu.Item value="reorder-folder">
                      <CgReorder /> Навести порядок в группе
                    </Menu.Item>
                  )}
                  <Menu.Item value="move-folder">
                    <LuFolderInput /> Переместить группу
                  </Menu.Item>
                  <Menu.Item
                    color="fg.error"
                    value="delete-folder"
                  >
                    <LuFolderMinus /> Удалить группу
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Flex>
      {group.open && <Box pl={6}>
        <Stack>
          {group.childern.length > 0 && group.childern.map(childGroup => (
            <NpcTreeItem key={childGroup.id} group={childGroup} depth={depth + 1} />
          ))}
        </Stack>
        <Box pb={2}>
          {chars.map(char => (
            <Flex
              key={char.id}
              fontWeight={char.id === activeId ? '700' : '300'}
              color={char.id === activeId ? '#3f4d3f' : 'dark'}
              cursor='pointer'
              onClick={() => setActiveId(char.id)}
              alignContent='baseline'
              gap='12px'
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
          ))}
          {isEmpty && (
            <Text fontSize='sm' fontStyle='italic' color='gray'>тут пусто</Text>
          )}
        </Box>
      </Box>}
    </Box>
  )
}
