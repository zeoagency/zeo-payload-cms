import type { CollectionConfig } from 'payload'

export const SeoDictionaryTerms: CollectionConfig = {
  slug: 'seo-dictionary-terms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category'],
    group: 'Dictionaries',
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'teaser',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description for listings',
      },
    },
    {
      name: 'definition',
      type: 'richText',
      localized: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'relatedTerms',
      type: 'relationship',
      relationTo: 'seo-dictionary-terms',
      hasMany: true,
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
    {
      name: 'authorityLinks',
      type: 'richText',
      localized: true,
      admin: {
        description: 'External authority links',
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
        
        // Only revalidate published terms
        if (doc._status === 'published') {
          try {
            // Revalidate SEO dictionary terms using tags
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
              },
              body: JSON.stringify({
                tags: ['seo-dictionary-terms'],
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
