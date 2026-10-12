import type { MenuOptionGroup } from './menu-data';

// A live catalog can remove an alternative or lower its maximum while a detail is open.
export function currentMenuChoices(groups: MenuOptionGroup[], choices: Record<string, string[]>) {
  return Object.fromEntries(groups.map(group => {
    const selectable = new Set(group.options.filter(option => option.available !== false).map(option => option.id));
    return [group.id, [...new Set(choices[group.id] ?? [])].filter(id => selectable.has(id)).slice(0, group.multiple ? group.maxChoices ?? 1 : 1)];
  }));
}
