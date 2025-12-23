import type { GlobalConfig } from 'payload'

export const GeoPage: GlobalConfig = {
  slug: 'geo-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'titleSmall', type: 'text' },
        { name: 'titleBig', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'aiPlatforms',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'platforms',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'methodology',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'industryCases',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'cases',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'comparison',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'results',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'metric', type: 'text' },
            { name: 'value', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'video',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'videoUrl', type: 'text' },
      ],
    },
    {
      name: 'trustSignals',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'logos',
          type: 'array',
          fields: [{ name: 'logo', type: 'upload', relationTo: 'media' }],
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'question', type: 'text' },
            { name: 'answer', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },
  ],
}
