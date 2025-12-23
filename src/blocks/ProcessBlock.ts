import type { Block } from 'payload'

export const ProcessBlock: Block = {
  slug: 'process',
  labels: {
    singular: 'Process',
    plural: 'Processes',
  },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'step', type: 'number' },
        { name: 'title', type: 'text', localized: true },
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
        { name: 'urlText', type: 'text', localized: true },
      ],
    },
  ],
}
