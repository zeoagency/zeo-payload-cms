import type { CollectionConfig } from 'payload'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'position', 'createdAt'],
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
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'coverLetter',
      type: 'textarea',
    },
    {
      name: 'resume',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: ['submitted', 'under-review', 'interview', 'offered', 'rejected', 'withdrawn'],
      defaultValue: 'submitted',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
