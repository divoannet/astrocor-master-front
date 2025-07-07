import './App.css'
import { AppHeader } from "@/components/AppHeader";
import { NpcListPage } from "@/components/NpcList";
import { RulesPage } from '@/components/RulesPage';
import { TraitsListPage } from "@/components/TraitsList";
import { Toaster } from "@/components/ui/toaster"
import { Box } from "@chakra-ui/react";
import { usePageStore } from "@/store";
import { useEffect } from 'react';

function App() {
  const screen = usePageStore(state => state.screen);
  const setScreen = usePageStore(state => state.setScreen);

  useEffect(() => {
    const screen = localStorage.getItem('screen');

    if (screen) {
      setScreen(screen);
    }
  }, []);

  return (
    <Box className='app-wrapper'>
      <AppHeader />

      {screen === 'npc' && <NpcListPage />}
      {screen === 'traits' && <TraitsListPage />}
      {screen === 'rules' && <RulesPage />}

      <Toaster />
    </Box>
  )
}

export default App
