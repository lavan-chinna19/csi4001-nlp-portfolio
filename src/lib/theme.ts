export type Theme = 'dark' | 'ivory';

export function themeFor(pathname: string): Theme {
  // Charcoal is the base for every route; pages add ivory sections for variation.
  void pathname;
  return 'dark';
}
