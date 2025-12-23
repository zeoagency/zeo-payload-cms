import type { CollectionConfig } from 'payload'

export const MarketingTools: CollectionConfig = {
  slug: 'marketing-tools',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'pricing',
      type: 'text',
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', localized: true },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
  ],
}
