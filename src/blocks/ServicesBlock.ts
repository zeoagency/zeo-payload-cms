import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Services List',
    plural: 'Services Lists',
  },
  fields: [
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'rightTitle', type: 'text', localized: true },
    { name: 'rightLinkText', type: 'text', localized: true },
    { name: 'rightLinkUrl', type: 'text' },
    // Fields for Service SubServices compatibility
    { name: 'sideTitleFirst', type: 'text', localized: true },
    { name: 'sideTitleSecond', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'titleFirst', type: 'text', localized: true },
        { name: 'titleSecond', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true }, // Unified title field
        { name: 'description', type: 'textarea', localized: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
