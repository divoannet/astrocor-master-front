import { useEffect, useState } from "react";
import { Field, Popover, Image, Input, Group, IconButton } from "@chakra-ui/react"
import defaultAvatar from '@/assets/default_avatar.png';
import { useNpcStore } from "@/store";
import { LuCheck, LuX } from "react-icons/lu";

export const ImagePopover = () => {
  const [open, setOpen] = useState(false);
  const [localImage, setLocalImage] = useState(defaultAvatar);

  const image = useNpcStore(state => state.image);
  const setImage = useNpcStore(state => state.setImage);

  const updateNpc = useNpcStore(state => state.updateNpc);

  const handleSave = () => {
    if (localImage !== image) {
      setImage(localImage);
      updateNpc();
    }

    setOpen(false);
  }

  const handleReset = () => {
    setLocalImage(image);
    setOpen(false);
  }

  useEffect(() => {
    setLocalImage(image);
  }, [image]);

  return (
    <Popover.Root
      positioning={{ placement: "left" }}
      open={open}
      onOpenChange={event => setOpen(event.open)}
      onExitComplete={handleReset}
    >
      <Popover.Trigger>
        <Image objectFit="cover" w="120px" maxH="200px" src={image || defaultAvatar} />
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger />
          <Popover.Arrow />
          <Popover.Body>
            <Group alignItems="flex-end">
              <Field.Root required>
                <Field.Label>Ссылка на изображение</Field.Label>
                <Input placeholder="Ссылка на изображение" value={localImage} onChange={e => setLocalImage(e.target.value)} />
              </Field.Root>
              <IconButton variant="outline" onClick={handleReset}>
                <LuX />
              </IconButton>
              <IconButton variant="outline" onClick={handleSave}>
                <LuCheck />
              </IconButton>
            </Group>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}