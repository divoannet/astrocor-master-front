import { useRulesStore } from '@/store';
import { Box, Button, Group, NativeSelect } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import Editor, { type ContentEditableEvent } from 'react-simple-wysiwyg';

const LABELS: Record<string, string> = {
  rules_common: 'Общие',
  rules_pool: "Кубы",
  rules_traits: "Трейты",
  rules_inventory: "Инвентарь",
  rules_secrets: "Секреты",
  rules_keys: 'Ключи',
}

export const RulesPage = () => {
  const loadRules = useRulesStore(state => state.load);
  const saveRule = useRulesStore(state => state.save);
  const rules = useRulesStore(state => state.rules);
  const updating = useRulesStore(state => state.updating);
  const options = useMemo(() => Object.keys(rules).map(item => ({ label: LABELS[item] || 'Другое', value: item })), [rules]);

  const [key, setKey] = useState('');
  const [html, setHtml] = useState('my <b>HTML</b>');

  const isChanged = rules[key] !== html;

  const onChange = (e: ContentEditableEvent) => {
    setHtml(e.target.value);
  }

  const handleSave = async () => {
    await saveRule(key, html);
    await loadRules();
  }

  useEffect(() => {
    setHtml(rules[key] || '');
  }, [key]);

  useEffect(() => {
    loadRules().then(() => {
      !Boolean(key) && setKey('rules_common');
    });
  }, []);

  return (
    <Box padding={8} spaceY={6}>

      <Group gap={4}>
        <NativeSelect.Root size='sm' variant="plain" bg='colors.paper' colorPalette='green'>
          <NativeSelect.Field name='rule_key' value={key} onChange={e => setKey(e.currentTarget.value)}>
            {options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Button size='xs' disabled={!isChanged || updating} loading={updating} onClick={handleSave}>Сохранить</Button>
      </Group>

      <Editor value={html} onChange={onChange} />

    </Box>
  )
}