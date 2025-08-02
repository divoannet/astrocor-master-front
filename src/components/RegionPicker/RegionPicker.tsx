import { useNpcStore } from "@/store";
import { Dialog, Portal } from "@chakra-ui/react"
import { TreeItem } from "./TreeItem";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (groupId: number) => void;
  activeGroup?: number;
  hideActiveGroup?: boolean;
}

export const RegionPicker = ({ open, onOpenChange, onChange, activeGroup, hideActiveGroup }: Props) => {
  const groups = useNpcStore(state => state.groups);

  return (
    <Dialog.Root open={open} onOpenChange={e => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Переместить персонажа</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {groups.map((item) => {
                const hidden = hideActiveGroup && item.id === activeGroup;
                return !hidden ? (
                  <TreeItem
                    activeGroup={activeGroup}
                    key={item.id}
                    group={item}
                    onClick={onChange}
                    hideActiveGroup={hideActiveGroup}
                  />
                ) : <></>;
              })}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}