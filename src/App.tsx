import './App.css'
import {AppHeader} from "@/components/AppHeader";
import {NpcListPage} from "@/components/NpcList";
import {TraitsListPage} from "@/components/TraitsList";
import { Toaster } from "@/components/ui/toaster"
import {Box} from "@chakra-ui/react";
import {usePageStore} from "@/store";

function App() {
  const screen = usePageStore(state => state.screen);

  return (
    <Box className='app-wrapper'>
      <AppHeader />

      {screen === 'npc' && <NpcListPage />}
      {screen === 'traits' && <TraitsListPage />}

      <Toaster/>
    </Box>
  )
}

export default App
