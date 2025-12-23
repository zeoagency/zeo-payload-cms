import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    { name: 'display', type: 'checkbox', defaultValue: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'jobTitle', type: 'text' },
        { name: 'sentence', type: 'textarea', localized: true },
        { name: 'profileImage', type: 'upload', relationTo: 'media' },
        { name: 'contactUrl', type: 'text' },
        // Service Testimonials compatibility
        { name: 'quote', type: 'textarea', localized: true },
        { name: 'quote2', type: 'textarea', localized: true },
        { name: 'author', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'companyLogo', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'ctaText', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text' },
    // Service Testimonials Section Metadata compatibility
    { name: 'titleSmall', type: 'text', localized: true },
    { name: 'titleBig', type: 'text', localized: true },
    { name: 'titleSmallDescription', type: 'textarea', localized: true },
    { name: 'displayAllReferencesLink', type: 'checkbox', defaultValue: false },
  ],
}
