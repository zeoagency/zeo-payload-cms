import type { CollectionConfig } from 'payload'
import { 
  publishedOrOwnDrafts, 
  adminOrEditorCanCreate 
} from '../access'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publisher', 'publishYear'],
    group: 'Content',
  },
  access: {
    read: publishedOrOwnDrafts,
    create: adminOrEditorCanCreate,
    update: ({ req: { user } }) => user?.roles?.includes('admin') || user?.roles?.includes('editor'),
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
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'publisher',
      type: 'text',
      localized: true,
    },
    {
      name: 'publishYear',
      type: 'number',
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'coverTitleFirst',
      type: 'text',
      localized: true,
      admin: {
        description: 'First line of title on book cover',
      },
    },
    {
      name: 'coverTitleSecond',
      type: 'text',
      localized: true,
      admin: {
        description: 'Second line of title on book cover',
      },
    },
    {
      name: 'coverDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description displayed on book cover',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'purchaseUrl',
      type: 'text',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Downloadable PDF file for the book',
      },
    },
    {
      name: 'autopilotappContactListId',
      type: 'text',
      admin: {
        description: 'Autopilot contact list ID for download form submissions',
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
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
        
        // Only revalidate published books
        if (doc._status === 'published') {
          try {
            // Revalidate books using tags
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
              },
              body: JSON.stringify({
                tags: ['books'],
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
