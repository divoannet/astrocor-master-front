import { useNpcStore, usePageStore } from "@/store";
import { Accordion, Box, Button, Card, Center, Group, IconButton, Image, Menu, Portal, Spacer } from "@chakra-ui/react";
import defaultAvatar from '@/assets/default_avatar.png';
import { CreateNpcForm } from "./createNpcForm";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuDownload, LuFileJson2 } from "react-icons/lu";
import { exportNpcData } from "../db";
import { handleImportClick } from "../helpers";
import { NpcTree } from "./NpcTree";

export const NpcList = () => {
  const setActiveId = useNpcStore(state => state.setActiveId);
  const regionList = useNpcStore(state => state.regionList);
  const npcId = useNpcStore(state => state.id);
  const checkedRegion = useNpcStore(state => state.checkedRegion);
  const setCheckedRegion = useNpcStore(state => state.setCheckedRegion);
  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const toggleCreateModal = usePageStore(state => state.toggleCreateNpcModal);

  const handleMenuClick = async ({ value }: { value: string }) => {
    switch (value) {
      case 'import':
        await handleImportClick();
        await loadNpcList();
        break;
      case 'export':
        await exportNpcData();
        break;
    }
  }

  return (
    <Box spaceY={4} scrollBehavior='auto'>
      <Group grow attached>
        <Button
          onClick={() => toggleCreateModal(true)}
          width='100%'
          flexGrow='1'
        >
          Создать перонажа
        </Button>
        <Menu.Root onSelect={handleMenuClick}>
          <Menu.Trigger asChild>
            <IconButton flexGrow='0'><HiOutlineDotsVertical /></IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="import"> <LuFileJson2 />Импортировать</Menu.Item>
                <Menu.Item value="export"> <LuDownload />Скачать файл</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Group>
      <CreateNpcForm />
      <NpcTree />
    </Box>
  )
}