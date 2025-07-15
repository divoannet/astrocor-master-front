import { type MouseEvent } from 'react';
import { Box, Group, Loader, Link, Spacer, Menu, Center } from "@chakra-ui/react";
import { usePageStore } from "@/store";
import { ColorModeButton } from "../ui/color-mode";

export const AppHeader = () => {
  const screen = usePageStore(state => state.screen);
  const setScreen = usePageStore(state => state.setScreen);
  const update = false;

  const handleCharsClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setScreen('npc');
  }

  const handleSpecsClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setScreen('traits');
  }

  const handleRulesClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setScreen('rules');
  }

  return (
    <header className="app-header">
      <Box flexGrow={1} spaceY={2}>
        <Spacer h={20} />
        <Link
          className={`header-button chars ${screen === 'npc' && 'active'}`}
          onClick={handleCharsClick}
          href='#'
        >
          Персонажи
        </Link>
        <Link
          className={`header-button specs ${screen === 'traits' && 'active'}`}
          onClick={handleSpecsClick}
          href='#'
        >
          Специализации
        </Link>
        <Link
          className={`header-button rules ${screen === 'rules' && 'active'}`}
          onClick={handleRulesClick}
          href='#'
        >
          Правила
        </Link>
        <Menu.Root positioning={{ placement: 'right-start' }}>
          <Menu.Trigger asChild>
            <Center
              className="header-button charlists"
            >
              Чарлисты
            </Center>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item asChild value='1'><Link href="/charlist/?id=1" target='_blank' rel="noreferrer">Авель Гумбольдт-Рюэль</Link></Menu.Item>
              <Menu.Item asChild value='2'><Link href="/charlist/?id=2" target='_blank' rel="noreferrer">Вирджиния Данн</Link></Menu.Item>
              <Menu.Item asChild value='3'><Link href="/charlist/?id=3" target='_blank' rel="noreferrer">Михель Стараг</Link></Menu.Item>
              <Menu.Item asChild value='4'><Link href="/charlist/?id=4" target='_blank' rel="noreferrer">Оливера Экстон</Link></Menu.Item>
              <Menu.Item asChild value='5'><Link href="/charlist/?id=5" target='_blank' rel="noreferrer">Отто фон Меер</Link></Menu.Item>
              <Menu.Item asChild value='6'><Link href="/charlist/?id=6" target='_blank' rel="noreferrer">Честер ле Плакар</Link></Menu.Item>
              <Menu.Item asChild value='7'><Link href="/charlist/?id=7" target='_blank' rel="noreferrer">Юлиан тен Вальде</Link></Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

      </Box>
      <Group gap="xs">
        {update && (
          <Box w='60px'>
            <Loader />
          </Box>
        )}
        <ColorModeButton />
      </Group>
    </header>
  )
}