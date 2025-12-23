import type { Block } from 'payload'

export const AboutZeoBlock: Block = {
  slug: 'aboutZeo',
  labels: {
    singular: 'About Zeo',
    plural: 'About Zeo',
  },
  fields: [
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      type: 'group',
      name: 'subSection1',
      label: 'Sub Section 1',
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'logo1', type: 'upload', relationTo: 'media' },
        { name: 'logo2', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'subSection2',
      label: 'Sub Section 2',
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'logo1', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'subSection3',
      label: 'Sub Section 3',
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'logo1', type: 'upload', relationTo: 'media' },
        { name: 'logo2', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'attendedConferences',
      label: 'Attended Conferences',
      fields: [
        { name: 'titleLine1', type: 'text', localized: true },
        { name: 'titleLine2', type: 'text', localized: true },
        { name: 'titleLine3', type: 'text', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'url', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'tools',
      label: 'Tools',
      fields: [
        { name: 'titleLine1', type: 'text', localized: true },
        { name: 'titleLine2', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'url', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
