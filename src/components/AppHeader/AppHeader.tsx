import { Box, Group, Flex, Heading, IconButton, Loader } from "@chakra-ui/react";
import { HamburgerIcon } from "@/components/icons";
import { usePageStore } from "@/store";
import { ColorModeButton } from "../ui/color-mode";

export const AppHeader = () => {
  const toggleMenu = usePageStore(state => state.toggleMainMenu);
  const update = false;

  return (
    <header className="app-header">
      <Flex align="center" w='100%'>
        <div>
          <IconButton variant="ghost" onClick={() => toggleMenu()}>
            <HamburgerIcon />
          </IconButton>
        </div>
        <Box flexGrow={1} >
          <Heading size="2xl">
            Мастерская Астролябии Коридорных Фонарей
          </Heading>
        </Box>
        <Group gap="xs">
          {update && (
            <Box w='60px'>
              <Loader />
            </Box>
          )}
          <ColorModeButton />
        </Group>
      </Flex>
    </header>
  )
}