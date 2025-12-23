import type { GlobalConfig } from 'payload'

export const PageSettings: GlobalConfig = {
  slug: 'page-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'notFound',
      label: '404 Page',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'ctaText', type: 'text', localized: true },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'footer',
      label: 'Footer',
      fields: [
        { name: 'copyright', type: 'text', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'newsletter',
      label: 'Newsletter',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'placeholder', type: 'text', localized: true },
        { name: 'buttonText', type: 'text', localized: true },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      admin: { description: 'DatoCMS migration ID' },
    },
  ],
}
