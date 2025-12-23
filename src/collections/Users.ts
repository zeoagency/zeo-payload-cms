import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'roles'],
    group: 'System',
  },
  auth: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    update: ({ req: { user }, id }) => {
      if (user?.roles?.includes('admin')) return true
      return user?.id === id
    },
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'nickname',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly name for profile page',
      },
    },
    {
      name: 'jobPosition',
      type: 'text',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'richText',
      localized: true,
    },
    {
      name: 'bio',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Full author biography for profile page',
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
          admin: {
            placeholder: 'https://twitter.com/username',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            placeholder: 'https://linkedin.com/in/username',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            placeholder: 'https://github.com/username',
          },
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            placeholder: 'https://yourwebsite.com',
          },
        },
      ],
    },
    {
      name: 'linkedinLink',
      type: 'text',
      admin: {
        condition: (data) => false, // Hide in favor of socialLinks group
      },
    },
    {
      name: 'twitterLink',
      type: 'text',
      admin: {
        condition: (data) => false, // Hide in favor of socialLinks group
      },
    },
    {
      name: 'orderNumber',
      type: 'number',
      admin: {
        description: 'Display order for team page',
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
      ],
      defaultValue: ['author'],
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
      },
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'DatoCMS migration ID',
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        // Skip revalidation during bulk imports or if context indicates skip
        if (context?.skipRevalidation) return
        
        try {
          // Revalidate team members using tags
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REVALIDATION_SECRET}`,
            },
            body: JSON.stringify({
              tags: ['users'],
            }),
          })
        } catch (error) {
          console.error('Failed to revalidate:', error)
        }
      },
    ],
  },
}
