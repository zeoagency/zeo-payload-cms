import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type', 'enabled', 'updatedAt'],
    group: 'Settings',
    description: 'Manage URL redirects for SEO preservation',
  },
  access: {
    read: () => true, // Public read for Next.js to fetch
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Source path (e.g., /old-page or /blog/:slug)',
      },
      validate: (value: string | undefined) => {
        if (!value?.startsWith('/')) {
          return 'Path must start with /'
        }
        return true
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: {
        description: 'Destination path (e.g., /en/new-page or /en/resources/articles/:slug)',
      },
      validate: (value: string | undefined) => {
        if (!value?.startsWith('/')) {
          return 'Path must start with /'
        }
        return true
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'permanent',
      options: [
        {
          label: '301 - Permanent',
          value: 'permanent',
        },
        {
          label: '302 - Temporary',
          value: 'temporary',
        },
        {
          label: '307 - Temporary (Preserve Method)',
          value: 'temporaryPreserveMethod',
        },
        {
          label: '308 - Permanent (Preserve Method)',
          value: 'permanentPreserveMethod',
        },
      ],
      admin: {
        description: 'Redirect type - use 301 for permanent SEO redirects',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or disable this redirect',
      },
    },
    {
      name: 'priority',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Higher priority redirects are processed first (useful for pattern matching)',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this redirect (e.g., reason, migration date)',
      },
    },
  ],
  timestamps: true,
}
