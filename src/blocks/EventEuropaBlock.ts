import type { Block } from 'payload'

export const EventEuropaBlock: Block = {
  slug: 'eventEuropa',
  labels: {
    singular: 'Event Europa (Digitalzone)',
    plural: 'Event Europa',
  },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'description', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'linkText', type: 'text', localized: true },
    { name: 'linkUrl', type: 'text' },
  ],
}
