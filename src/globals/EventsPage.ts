import type { GlobalConfig } from 'payload'

export const EventsPage: GlobalConfig = {
  slug: 'events-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', localized: true, maxLength: 60 },
        { name: 'description', type: 'textarea', localized: true, maxLength: 160 },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      admin: { description: 'DatoCMS migration ID' },
    },
  ],
}
