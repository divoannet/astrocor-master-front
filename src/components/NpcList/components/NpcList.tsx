import { useNpcStore, usePageStore } from "@/store";
import { Accordion, Box, Button, Card, Center, Group, IconButton, Image, Menu, Portal, Spacer } from "@chakra-ui/react";
import defaultAvatar from '@/assets/default_avatar.png';
import { CreateNpcForm } from "./createNpcForm";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuDownload, LuFileJson2 } from "react-icons/lu";
import { exportNpcData } from "../db";
import { handleImportClick } from "../helpers";

export const NpcList = () => {
  const setActiveId = useNpcStore(state => state.setActiveId);
  const regionList = useNpcStore(state => state.regionList);
  const npcId = useNpcStore(state => state.id);
  const checkedRegion = useNpcStore(state => state.checkedRegion);
  const setCheckedRegion = useNpcStore(state => state.setCheckedRegion);
  const loadNpcList = useNpcStore(state => state.loadNpcList);

  const toggleCreateModal = usePageStore(state => state.toggleCreateNpcModal);

  const handleMenuClick = async ({value}: { value: string }) => {
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
      <Accordion.Root
        variant='enclosed'
        collapsible value={[checkedRegion]}
        onValueChange={details => setCheckedRegion(details.value[0])}
      >
        {Object.entries(regionList).length === 0 && (
          <Card.Root><Center>Список пока пуст</Center></Card.Root>
        )}
        {Object.entries(regionList).map(([region, items]) => {
          return (
            <Accordion.Item key={region} value={region}>
              <Accordion.ItemTrigger cursor='pointer'>{region}</Accordion.ItemTrigger>
              <Accordion.ItemContent padding='1'>
                <Spacer h={1} />
                {items.map(npc => (
                  <Card.Root
                    key={npc.id}
                    flexDirection="row"
                    alignItems="center"
                    overflow="hidden"
                    size="sm"
                    className="npc-list-item"
                    colorPalette='success'
                    borderRadius={0}
                    borderColor="bg"
                    color={npcId === npc.id ? "green.contrast" : "bg.contrast"}
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