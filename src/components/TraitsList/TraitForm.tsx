import { Box, Button, Dialog, Field, Input, Textarea, Text, Group, IconButton, NumberInput, Card, Spacer } from "@chakra-ui/react";
import { LevelIcon } from "../icons/LevelIcon";
import { useTraitFormStore } from "@/store/traitForm/store";
import { LuX } from "react-icons/lu";
import { usePageStore, useTraitsStore } from "@/store";

export const TraitForm = () => {
  const open = usePageStore(state => state.createTraitModalOpen);
  const toggle = usePageStore(state => state.toggleCreateTraitModal);

  const setValues = useTraitFormStore(state => state.setValues);
  const title = useTraitFormStore(state => state.title);
  const epigraph = useTraitFormStore(state => state.epigraph);
  const description = useTraitFormStore(state => state.description);
  const price = useTraitFormStore(state => state.price);
  const tags = useTraitFormStore(state => state.tags);
  const secret = useTraitFormStore(state => state.secret);
  const setSecretValue = useTraitFormStore(state => state.setSecretValue);
  const setTagValue = useTraitFormStore(state => state.setTagValue);
  const addTag = useTraitFormStore(state => state.addTag);
  const removeTag = useTraitFormStore(state => state.removeTag);

  const saveTrait = useTraitFormStore(state => state.saveTrait);
  const resetForm = useTraitFormStore(state => state.resetForm);
  const loadTraits = useTraitsStore(state => state.loadTraits);

  const handleCancel = () => {
    toggle(false);
    resetForm();
  }

  const handleSave = async () => {
    toggle(false);
    await saveTrait();
    resetForm();
    await loadTraits();
  }

  return (
    <Dialog.Root open={open} onOpenChange={e => toggle(e.open)} scrollBehavior="inside">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Новая специализация</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Box spaceY={2}>
              <Field.Root>
                <Field.Label>Название</Field.Label>
                <Input
                  size="xs"
                  value={title}
                  onChange={(e) => setValues({ title: e.target.value })}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Эпиграф</Field.Label>
                <Textarea
                  size="xs"
                  value={epigraph}
                  onChange={(e) => setValues({ epigraph: e.target.value })}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Описание</Field.Label>
                <Textarea
                  size="xs"
                  value={description}
                  onChange={(e) => setValues({ description: e.target.value })}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Цена за специализацию (xp)</Field.Label>
                <NumberInput.Root
                  size="xs"
                  value={price}
                  onValueChange={(e) => setValues({ price: e.value })}
                  width="100%"
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Field.Root>
              <Text>Теги</Text>
              {tags.map((tag, index) => (
                <Group width='100%' key={index}>
                  <Box>
                    <IconButton
                      variant='ghost'
                      size='xs'
                      className="compact"
                      onClick={() => setTagValue(index, 'level', tag.level === 3 ? 1 : tag.level + 1)}
                    >
                      <LevelIcon level={tag.level} />
                    </IconButton>
                  </Box>
                  <Box flexGrow='1'>
                    <Input
                      size="xs"
                      value={tag.title}
                      onChange={e => setTagValue(index, 'title', e.target.value)}
                      placeholder="Название"
                    />
                  </Box>
                  <Box flexGrow='1'>
                    <Input
                      size="xs"
                      value={tag.description}
                      onChange={e => setTagValue(index, 'description', e.target.value)}
                      placeholder="Подсказка"
                    />
                  </Box>
                  <Box>
                    <IconButton
                      variant='ghost'
                      size='xs'
                      className="compact"
                      onClick={() => removeTag(index)}
                    >
                      <LuX />
                    </IconButton>
                  </Box>
                </Group>
              ))}

              <Button size="xs" variant='outline' onClick={addTag}>+ тэг</Button>

              <Spacer h={3} />

              <Card.Root>
                <Card.Title paddingY={2} paddingX={2}>Связанный секрет</Card.Title>
                <Card.Body paddingY={4} paddingX={2}>
                  <Box spaceY={2}>
                  <Field.Root>
                    <Field.Label>Название</Field.Label>
                    <Input
                      size="xs"
                      value={secret.title}
                      onChange={e => setSecretValue('title', e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Описание</Field.Label>
                    <Textarea
                      size="xs"
                      value={secret.description}
                      onChange={e => setSecretValue('description', e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Эффекты и последствия</Field.Label>
                    <Textarea
                      size="xs"
                      value={secret.hint}
                      onChange={e => setSecretValue('hint', e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Цена за секрет (xp)</Field.Label>
                    <NumberInput.Root
                      size="xs"
                      value={secret.price}
                      onValueChange={e => setSecretValue('price', e.value)}
                      width="100%"
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Field.Root>
                  </Box>
                </Card.Body>
              </Card.Root>
            </Box>
          </Dialog.Body>
          <Dialog.Footer>
            <Button size="sm" variant='outline' onClick={handleCancel}>Отменить</Button>
            <Button size="sm" onClick={handleSave}>Сохранить</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
};
