import { type MouseEvent } from 'react';
import { Box, Group, Loader, Link, Spacer } from "@chakra-ui/react";
import { usePageStore } from "@/store";
import { ColorModeButton } from "../ui/color-mode";

export const AppHeader = () => {
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

  return (
    <header className="app-header">
      <Box flexGrow={1} spaceY={2}>
        <Spacer h={20} />
        <Link
          className="header-button chars"
          onClick={handleCharsClick}
          href='#'
        >
          Персонажи
        </Link>
        <Link
          className="header-button specs"
          onClick={handleSpecsClick}
          href='#'
        >
          Специализации
        </Link>
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