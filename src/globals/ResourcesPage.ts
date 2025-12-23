import type { GlobalConfig } from 'payload'

export const ResourcesPage: GlobalConfig = {
  slug: 'resources-page',
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
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
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
      type: 'group',
      name: 'specialContent',
      label: 'Special Content Section',
      fields: [
        {
          name: 'specialTitleSmall',
          type: 'text',
          localized: true,
          admin: { description: 'Small title above main title (e.g., "Explore More")' },
        },
        {
          name: 'specialTitleBig',
          type: 'text',
          localized: true,
          admin: { description: 'Main section title' },
        },
        {
          name: 'pageLinks',
          type: 'array',
          label: 'Special Page Links',
          minRows: 0,
          maxRows: 12,
          admin: { description: 'Cards linking to special content pages' },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                placeholder: '/path or https://...',
                description: 'Internal path (e.g., /en/tools) or external URL',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Card image (recommended: 400x300)' },
            },
          ],
        },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      admin: { description: 'DatoCMS migration ID' },
    },
  ],
}
