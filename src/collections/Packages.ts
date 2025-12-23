import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price'],
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
      type: 'richText',
      localized: true,
    },
    {
      name: 'price',
      type: 'text',
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', localized: true },
        { name: 'included', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'coverTitleFirst',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'coverTitleSecond',
      type: 'text',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'richText',
      localized: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      localized: true,
    },
    {
      name: 'autopilotappContactListId',
      type: 'text',
      admin: { position: 'sidebar', description: 'Autopilot contact list ID' },
    },
    {
      name: 'formHasPeopleCountField',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show people count field in registration form' },
    },
    {
      name: 'formActionText',
      type: 'text',
      localized: true,
      admin: { description: 'Custom text for form submit button' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      localized: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Package file/PDF' },
    },
    {
      name: 'title2',
      type: 'text',
      localized: true,
      admin: { description: 'Secondary title for package page' },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        // Skip revalidation during bulk imports or if context indicates skip
        if (context?.skipRevalidation) return

        // Only revalidate published packages
        if (doc._status === 'published') {
          try {
            // Revalidate packages using tags
            await fetch(
              `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${process.env.REVALIDATION_SECRET}`,
                },
                body: JSON.stringify({
                  tags: ['packages'],
                }),
              },
            )
          } catch (error) {
            console.error('Failed to revalidate:', error)
          }
        }
      },
    ],
  },
}
