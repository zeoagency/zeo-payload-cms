import type { Block } from 'payload'

export const ResourcesBlock: Block = {
  slug: 'resources',
  labels: {
    singular: 'Resources',
    plural: 'Resources',
  },
  fields: [
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'contentCountsSuffix', type: 'text', localized: true },
    { name: 'contentCountsLinkText', type: 'text', localized: true },
    {
      name: 'boxes',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'richText', localized: true },
        { name: 'buttonText', type: 'text', localized: true },
        { name: 'linkUrl', type: 'text' },
        { name: 'linkTitle', type: 'text', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'guidebook',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'linkUrl', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'fullbox',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'richText', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'linkUrl', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'digitalzoneLink',
      fields: [
        { name: 'prefix', type: 'text', localized: true },
        { name: 'suffix', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'agileApproach',
      fields: [
        { name: 'titleFirstLine', type: 'text', localized: true },
        { name: 'titleSecondLine', type: 'text', localized: true },
        { name: 'firstQuestion', type: 'text', localized: true },
        { name: 'firstAnswer', type: 'textarea', localized: true },
        { name: 'secondQuestion', type: 'text', localized: true },
        { name: 'secondAnswer', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
