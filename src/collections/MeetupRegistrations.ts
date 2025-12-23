import type { CollectionConfig } from 'payload'

export const MeetupRegistrations: CollectionConfig = {
  slug: 'meetup-registrations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
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
      name: 'jobTitle',
      type: 'text',
    },
    {
      name: 'dietaryRestrictions',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['registered', 'confirmed', 'cancelled'],
      defaultValue: 'registered',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
