import type { CollectionConfig } from 'payload'

export const CustomerReferences: CollectionConfig = {
  slug: 'customer-references',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'logo', 'category'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'customer-reference-categories',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'orderNumber',
      type: 'number',
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
  ],
}
