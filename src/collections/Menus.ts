import type { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'title',
    group: 'System',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text' },
        { name: 'external', type: 'checkbox', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'url', type: 'text' },
            { name: 'external', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
  ],
}
