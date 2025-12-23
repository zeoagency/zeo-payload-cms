import type { GlobalConfig } from 'payload'

export const AlgorithmUpdatesPage: GlobalConfig = {
  slug: 'algorithm-updates-page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    { type: 'group', name: 'hero', fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true },
    ]},
    { type: 'group', name: 'seo', fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
    ]},
    { name: 'datoId', type: 'text' },
  ],
}
