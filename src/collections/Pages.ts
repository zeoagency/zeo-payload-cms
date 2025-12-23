import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    group: 'Content',
  },
  versions: {
    drafts: true,
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
// {
    //   name: 'content',
    //   type: 'richText',
    //   required: true,
    //   localized: true,
    // },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      localized: true,
      blocks: [HeroBlock],
    },
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'metaImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
  ],
  timestamps: true,
}
