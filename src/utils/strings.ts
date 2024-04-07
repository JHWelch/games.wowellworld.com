export const kebab = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase()

export const id = (str: string) => kebab(str).replace(/[^a-z0-9-]/g, '')
