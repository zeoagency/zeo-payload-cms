import type { GlobalConfig } from 'payload'

export const Translations: GlobalConfig = {
  slug: 'translations',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'data',
      type: 'json',
      admin: {
        description: 'All translation strings as JSON object',
      },
    },
    {
      name: 'datoId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
