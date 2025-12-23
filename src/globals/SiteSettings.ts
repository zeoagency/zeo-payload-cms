import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'general',
      label: 'General',
      fields: [
        { name: 'siteName', type: 'text', localized: true },
        { name: 'siteDescription', type: 'textarea', localized: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'favicon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'social',
      label: 'Social Media',
      fields: [
        { name: 'twitter', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'defaultSeo',
      label: 'Default SEO',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'scripts',
      label: 'Scripts',
      fields: [
        { name: 'headerScripts', type: 'code', admin: { language: 'html' } },
        { name: 'footerScripts', type: 'code', admin: { language: 'html' } },
      ],
    },
    {
      name: 'offices',
      label: 'Office Locations',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'city', type: 'text', required: true, localized: true },
        { name: 'country', type: 'text', required: true, localized: true },
        { name: 'address', type: 'textarea', localized: true },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        {
          type: 'group',
          name: 'coordinates',
          fields: [
            { name: 'latitude', type: 'number' },
            { name: 'longitude', type: 'number' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'newsletter',
      label: 'Newsletter Settings',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'buttonText', type: 'text', localized: true },
        { name: 'placeholderText', type: 'text', localized: true },
        { name: 'successMessage', type: 'textarea', localized: true },
        { name: 'formAction', type: 'text', admin: { description: 'Newsletter form endpoint URL' } },
      ],
    },
    {
      type: 'group',
      name: 'footer',
      label: 'Footer Content',
      fields: [
        { name: 'copyright', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'url', type: 'text', required: true },
            { name: 'newTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      admin: { description: 'DatoCMS migration ID' },
    },
  ],
}
