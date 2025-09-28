import { useNpcStore, usePageStore } from "@/store";
import { Box, Button, Group, IconButton, Menu, Portal } from "@chakra-ui/react";
import { CreateNpcForm } from "./createNpcForm";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuDownload, LuFileJson2 } from "react-icons/lu";
import { exportNpcData } from "../db";
import { handleImportClick } from "../helpers";
import { NpcTree } from "./NpcTree";

export const NpcList = () => {
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