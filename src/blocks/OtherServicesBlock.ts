import type { Block } from 'payload'

export const OtherServicesBlock: Block = {
  slug: 'otherServices',
  labels: {
    singular: 'Other Services',
    plural: 'Other Services',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'titleFirst', type: 'text', localized: true },
        { name: 'descriptionFirst', type: 'textarea', localized: true },
        { name: 'titleSecond', type: 'text', localized: true },
        { name: 'descriptionSecond', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'displayImageAtRight', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
