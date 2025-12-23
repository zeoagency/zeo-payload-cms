import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', '_status'],
    group: 'Content',
  },
  versions: {
    drafts: true,
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
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief summary for listings and previews',
      },
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'customer-references',
      admin: {
        description: 'Client/customer this case study is about',
      },
    },
    {
      name: 'challenge',
      type: 'richText',
      localized: true,
      admin: {
        description: 'The challenge or problem the client faced',
      },
    },
    {
      name: 'solution',
      type: 'richText',
      localized: true,
      admin: {
        description: 'How Zeo solved the challenge',
      },
    },
    {
      name: 'results',
      type: 'richText',
      localized: true,
      admin: {
        description: 'The outcomes and results achieved',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Additional content (optional)',
      },
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
      admin: {
        description: 'Client logo',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'text' },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    {
      name: 'testimonial',
      type: 'group',
      fields: [
        { name: 'quote', type: 'textarea', localized: true },
        { name: 'author', type: 'text' },
        { name: 'position', type: 'text' },
      ],
    },
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
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
        
        // Only revalidate published case studies
        if (doc._status === 'published') {
          try {
            // Revalidate case studies using tags
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
              },
              body: JSON.stringify({
                tags: ['case-studies'],
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
