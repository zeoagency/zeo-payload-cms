import type { Block } from 'payload'

export const InternationalBlock: Block = {
  slug: 'international',
  labels: {
    singular: 'International',
    plural: 'International',
  },
  fields: [
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'eventType', type: 'text', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
