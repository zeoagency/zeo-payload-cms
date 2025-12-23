import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', localized: true },
        { name: 'answer', type: 'richText', localized: true },
      ],
    },
  ],
}
