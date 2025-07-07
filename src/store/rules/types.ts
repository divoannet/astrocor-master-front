export interface RulesPageType {
  fetching: boolean;
  updating: boolean;
  rules: Record<string, string>;
  load: () => Promise<void>;
  save: (key: string, value: string) => Promise<void>;
}