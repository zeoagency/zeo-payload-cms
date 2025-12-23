import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'company', 'createdAt'],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'in-progress', 'completed'],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
