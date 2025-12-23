import type { CollectionConfig } from 'payload'

export const Webinars: CollectionConfig = {
  slug: 'webinars',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'speaker'],
    group: 'Events',
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
      name: 'date',
      type: 'date',
      required: true,
      index: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'videoUrl',
      type: 'text',
    },
    {
      name: 'speaker',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        description: 'Webinar category for filtering',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Additional tags for webinar',
      },
    },
    {
      name: 'speakers',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        description: 'Webinar speakers',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Webinar start time',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Webinar end time',
      },
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text', localized: true, maxLength: 60 },
        { name: 'description', type: 'textarea', localized: true, maxLength: 160 },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        // Skip revalidation during bulk imports or if context indicates skip
        if (context?.skipRevalidation) return
        
        // Only revalidate published webinars
        if (doc._status === 'published') {
          try {
            // Revalidate webinars using tags
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
              },
              body: JSON.stringify({
                tags: ['webinars'],
              }),
            })
          } catch (error) {
            console.error('Failed to revalidate:', error)
          }
        }
      },
    ],
  },
}
