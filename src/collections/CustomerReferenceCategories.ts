import type { CollectionConfig } from 'payload'

export const CustomerReferenceCategories: CollectionConfig = {
  slug: 'customer-reference-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Taxonomy',
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
