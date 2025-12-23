import type { Block } from 'payload'

export const StoriesBlock: Block = {
  slug: 'stories',
  labels: {
    singular: 'Stories',
    plural: 'Stories',
  },
  fields: [
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caseStudy', type: 'relationship', relationTo: 'case-studies' },
      ],
    },
    {
      name: 'referenceLogos',
      type: 'array',
      label: 'Reference Logos',
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
