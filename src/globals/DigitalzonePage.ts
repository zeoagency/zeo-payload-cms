import type { GlobalConfig } from 'payload'

export const DigitalzonePage: GlobalConfig = {
  slug: 'digitalzone-page',
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
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaUrl', type: 'text' },
        { name: 'ctaText', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'eventDate', type: 'date' },
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
      name: 'about',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'what',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'richText' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'icon', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'experience',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'schedule',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'time', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'speaker', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'speakers',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'company', type: 'text' },
            { name: 'bio', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'sponsors',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'url', type: 'text' },
            { name: 'tier', type: 'select', options: ['platinum', 'gold', 'silver', 'bronze'] },
          ],
        },
      ],
    },
    {
      name: 'sponsorForm',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'submitButtonText', type: 'text' },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'tiers',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'price', type: 'text' },
            { name: 'currency', type: 'text' },
            { name: 'features', type: 'textarea' },
            { name: 'ctaText', type: 'text' },
            { name: 'ctaUrl', type: 'text' },
            { name: 'featured', type: 'checkbox' },
          ],
        },
      ],
    },
    {
      name: 'pastVideos',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'videos',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'videoUrl', type: 'text' },
            { name: 'thumbnail', type: 'upload', relationTo: 'media' },
            { name: 'year', type: 'text' },
          ],
        },
      ],
    },
  ],
}
