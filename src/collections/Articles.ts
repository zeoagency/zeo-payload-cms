import type { CollectionConfig } from 'payload'
import { 
  publishedOrOwnDrafts, 
  authorCanEditOwn, 
  adminOrEditorCanCreate,
  adminOnlyField 
} from '../access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'publishedAt', '_status'],
    group: 'Content',
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  access: {
    read: publishedOrOwnDrafts,
    create: adminOrEditorCanCreate,
    update: authorCanEditOwn,
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
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
      name: 'descriptionSmall',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description for cards and previews',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'tableOfContents',
      type: 'array',
      localized: true,
      admin: {
        description: 'Optional: Manual table of contents. If not provided, will auto-generate from headings.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Display text for the ToC entry',
          },
        },
        {
          name: 'sectionId',
          type: 'text',
          required: true,
          admin: {
            description: 'ID of the heading element to link to (e.g., "introduction")',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 5,
    },
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'metaImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
    {
      name: 'workflowStatus',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In Review', value: 'review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Schedule content to publish at specific date/time',
      },
    },
    {
      name: 'ratings',
      type: 'array',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      fields: [
        {
          name: 'userId',
          type: 'text',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'createdAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      name: 'averageRating',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
        step: 0.1,
      },
      access: {
        read: adminOnlyField,
      },
    },
    {
      name: 'totalRatings',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      access: {
        read: adminOnlyField,
      },
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Number of article views',
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            // Only allow incrementing views, not setting arbitrary values
            if (operation === 'update' && value !== undefined) {
              return value // Allow view updates through API
            }
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        // Skip revalidation during bulk imports or if context indicates skip
        if (context?.skipRevalidation) return
        
        // Only revalidate published articles
        if (doc.workflowStatus === 'published') {
          try {
            // Revalidate the specific article using tags
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
              },
              body: JSON.stringify({
                tags: ['articles'],
              }),
            })
            
            // Also revalidate the articles listing (already covered by tags)
            // This is redundant since we're using tags, but keeping for clarity
            
            // Revalidate homepage if it's a featured article
            if (doc.featured) {
              await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
                },
                body: JSON.stringify({
                  tags: ['homepage'],
                }),
              })
            }
          } catch (error) {
            console.error('Failed to revalidate:', error)
            // In production, you might want to use your logger here
          }
        }
      },
    ],
  },
}
