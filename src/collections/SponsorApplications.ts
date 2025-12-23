import type { CollectionConfig } from 'payload'

export const SponsorApplications: CollectionConfig = {
  slug: 'sponsor-applications',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactName', 'email', 'createdAt'],
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactName',
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
      name: 'sponsorshipLevel',
      type: 'select',
      options: ['platinum', 'gold', 'silver', 'bronze'],
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['submitted', 'under-review', 'approved', 'rejected'],
      defaultValue: 'submitted',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
