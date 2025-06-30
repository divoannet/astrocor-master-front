import './App.css'
import {AppHeader} from "@/components/AppHeader";
import {AppMenu} from "@/components/AppMenu";
import {NpcListPage} from "@/components/NpcList";
import { Toaster } from "@/components/ui/toaster"
import {Box} from "@chakra-ui/react";
import {usePageStore} from "@/store";

function App() {
  const screen = usePageStore(state => state.screen);

  return (
    <Box className='app-wrapper'>
      <AppHeader />
      <AppMenu />

      {screen === 'npc' && <NpcListPage />}

      <Toaster/>
    </Box>
  )
}

export default App
