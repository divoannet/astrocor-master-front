import { useNpcStore, usePageStore } from "@/store";
import { Combobox, Dialog, Portal, createListCollection } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

export const SearchDialog = () => {
  const list = useNpcStore(state => state.npcList);
  const setActiveId = useNpcStore(state => state.setActiveId);

  const open = usePageStore(state => state.searchDialogOpened);
  const toggle = usePageStore(state => state.toggleSearchDialog);

  const [searchValue, setSearchValue] = useState('');

  const options = useMemo(() => list
    .map(item => ({ label: item.name, value: `${item.id}` }))
    .sort((a, b) => a.label.localeCompare(b.label)),
    [list]);

  const filteredItems = useMemo(
    () =>
      searchValue !== '' ? options.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())
    ) : options,
    [searchValue, options],
  )

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems]
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const id = details.value[0];
    if (!id) return;
    setActiveId(+id);
    toggle();
  }

  useEffect(() => { setSearchValue('') }, [open]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={e => toggle(e.open)}
    >
      <Dialog.Backdrop />
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content>
            <Combobox.Root
              collection={collection}
              onInputValueChange={(e) => setSearchValue(e.inputValue)}
              onValueChange={handleValueChange}
            >
              <Combobox.Control>
                <Combobox.Input placeholder="Поиск по NPC" />
              </Combobox.Control>

              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.Empty>{"Не нахожу =("}</Combobox.Empty>
                  {collection.items.map(item => (
                    <Combobox.Item item={item} key={item.value}>
                      {item.label}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>

            </Combobox.Root>
          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>
    </Dialog.Root>
  );
}