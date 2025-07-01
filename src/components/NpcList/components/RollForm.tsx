import { useNpcStore, usePageStore } from "@/store";
import type { NpcStoreTypes } from "@/store/npc/types";
import { Box, Button, Dialog, Group, Input, NumberInput, Portal, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const initialRolls: Record<keyof NpcStoreTypes['rolls'], string> = {
    battle: '0',
    intellect: '0',
    craft: '0',
    physical: '0',
    social: '0',
    custom: '0',
  };

export const RollForm = () => {
  const updateNpc = useNpcStore(state => state.updateNpc);

  const customRollTitle = useNpcStore(state => state.customRollTitle);
  const setCustomRollTitle = useNpcStore(state => state.setCustomRollTitle);

  const rolls = useNpcStore(state => state.rolls);
  const setRolls = useNpcStore(state => state.setRolls);

  const open = usePageStore(state => state.rollsSettingDialogOpen);
  const toggle = usePageStore(state => state.toggleRollsSettingDialog);

  const [ lrolls, setlRolls] = useState<Record<keyof NpcStoreTypes['rolls'], string>>(initialRolls);
  const [ customTitle, setCustomTitle ] = useState('');

  const handleCancelClick = () => {
    reset();
  }

  const handleSaveClick = () => {
    handleSave();

  }

  const handleChange = (key: string, value: string) => {
    const rolls = {
      ...lrolls,
      [key]: value,
    }

    setlRolls(rolls);
  }

  const reset = () => {
    setlRolls({
      battle: `${rolls.battle}`,
      intellect: `${rolls.intellect}`,
      craft: `${rolls.craft}`,
      physical: `${rolls.physical}`,
      social: `${rolls.social}`,
      custom: `${rolls.custom}`,
    })
    setCustomTitle(customRollTitle);
    toggle(false);
  }

  const handleSave = () => {
    const values: Partial<NpcStoreTypes['rolls']> = {};
    Object.entries(lrolls).forEach(([key, item]) => {
      const lkey = key as keyof NpcStoreTypes['rolls'];
      if (rolls[lkey] === Number(item)) return;
      values[lkey] = Number(item);
    });
    setRolls(values);

    if (customRollTitle !== customTitle) {
      setCustomRollTitle(customTitle);
    }

    updateNpc();
    toggle(false);
  }

  useEffect(() => {
    reset();
  }, [rolls, customRollTitle]);

  return (
    <Dialog.Root size='xs' open={open} placement="center" onOpenChange={e => toggle(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Body>

              <Box spaceY={2}>
                <Group width='100%' gap={4} justifyContent='space-between'>
                  <Text>Боевые</Text>
                  <NumberInput.Root
                    width='80px'
                    size="xs"
                    value={lrolls.battle}
                    min={0}
                    onValueChange={e => handleChange('battle', e.value)}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Group>

                <Group width='100%' gap={4} justifyContent='space-between'>
                  <Text>Интеллект</Text>
                  <NumberInput.Root
                    width='80px'
                    size="xs"
                    value={lrolls.intellect}
                    min={0}
                    onValueChange={e => handleChange('intellect', e.value)}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Group>

                <Group width='100%' gap={4} justifyContent='space-between'>
                  <Text>Технические</Text>
                  <NumberInput.Root
                    width='80px'
                    size="xs"
                    value={lrolls.craft}
                    min={0}
                    onValueChange={e => handleChange('craft', e.value)}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Group>

                <Group width='100%' gap={4} justifyContent='space-between'>
                  <Text>Физ. сопротивление</Text>
                  <NumberInput.Root
                    width='80px'
                    size="xs"
                    value={lrolls.physical}
                    min={0}
                    onValueChange={e => handleChange('physical', e.value)}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Group>

                <Group width='100%' gap={4} justifyContent='space-between'>
                  <Text>Социальные</Text>
                  <NumberInput.Root
                    width='80px'
                    size="xs"
                    value={lrolls.social}
                    min={0}
                    onValueChange={e => handleChange('social', e.value)}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Group>

                <Group width='100%' gap={4} justifyContent='space-between'>
                  <Box flexGrow='1'>
                    <Input
                      value={customTitle}
                      size="xs"
                      onChange={e => setCustomTitle(e.target.value)}
                    />
                  </Box>
                  <NumberInput.Root
                    width='80px'
                    size="xs"
                    value={lrolls.custom}
                    min={0}
                    onValueChange={e => handleChange('custom', e.value)}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Group>
              </Box>

            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handleCancelClick} size="sm" variant='outline'>Отменить</Button>
              <Button onClick={handleSaveClick} size="sm">Сохранить</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}