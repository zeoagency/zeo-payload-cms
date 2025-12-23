import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'phoneNumber', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageMobile', type: 'upload', relationTo: 'media' },
    { name: 'ctaText', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text' },
     // Fields for Service Hero compatibility
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'imageAsset', type: 'upload', relationTo: 'media' },
  ],
}
