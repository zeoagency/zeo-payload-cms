import type { GlobalConfig } from 'payload'

export const MeetupPage: GlobalConfig = {
  slug: 'meetup-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'titleLong', type: 'text' },
        { name: 'titleShort', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'registerButtonText', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageMobile', type: 'upload', relationTo: 'media' },
        { name: 'eventDate', type: 'date' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'schedule',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'time', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'speakers',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'talkHour', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'sponsors',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'register',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'registerButtonText', type: 'text' },
        { name: 'registerLink', type: 'text' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      localized: true,
      fields: [
        { name: 'contactEmailAddress', type: 'email' },
        { name: 'phoneNumber', type: 'text' },
        { name: 'contactUsText', type: 'text' },
        { name: 'copyrightTitleSmall', type: 'text' },
        { name: 'copyrightTitleBig', type: 'text' },
        { name: 'submitSuccessMessage', type: 'text' },
        { name: 'submitFailMessage', type: 'text' },
        { name: 'eMailAddressLabel', type: 'text' },
        { name: 'submitButtonText', type: 'text' },
      ],
    },
  ],
}
