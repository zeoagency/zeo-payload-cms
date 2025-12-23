import type { CollectionConfig } from 'payload'
import {
  HeroBlock,
  ServicesBlock,
  WhatWeDoBlock,
  ProcessBlock,
  TestimonialsBlock,
  StoriesBlock,
  FaqBlock,
  AboutZeoBlock,
} from '../blocks'

export const Services: CollectionConfig = {
  slug: 'services',
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        ServicesBlock,
        WhatWeDoBlock,
        ProcessBlock,
        TestimonialsBlock,
        StoriesBlock,
        FaqBlock,
        AboutZeoBlock,
      ],
    },
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAsset', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'subServices',
      label: 'Sub Services (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'sideTitleFirst', type: 'text', localized: true },
        { name: 'sideTitleSecond', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'icon', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'what',
      label: 'What We Do (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'richText', localized: true },
        { name: 'rightTitleSmall', type: 'text', localized: true },
        { name: 'rightTitleBig', type: 'text', localized: true },
        { name: 'rightDescription', type: 'textarea', localized: true },
        { name: 'leftTitleSmall', type: 'text', localized: true },
        { name: 'leftTitleBig', type: 'text', localized: true },
        { name: 'leftDescription', type: 'textarea', localized: true },
        { name: 'standaloneImage', type: 'upload', relationTo: 'media' },
        { name: 'section3TitleSmall', type: 'text', localized: true },
        { name: 'section3TitleBig', type: 'text', localized: true },
        { name: 'section3DescriptionSmall', type: 'textarea', localized: true },
        { name: 'section3Description', type: 'textarea', localized: true },
        { name: 'section3Image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'standaloneImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        hidden: true,
      },
    },
    {
      type: 'group',
      name: 'section2',
      label: 'Section 2 (Legacy)',
      admin: {
        hidden: true,
      },
      fields: [
        { name: 'rightTitleSmall', type: 'text', localized: true },
        { name: 'rightTitleBig', type: 'text', localized: true },
        { name: 'rightDescription', type: 'richText', localized: true },
        { name: 'leftTitleSmall', type: 'text', localized: true },
        { name: 'leftTitleBig', type: 'text', localized: true },
        { name: 'leftDescription', type: 'richText', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'section3',
      label: 'Section 3 (Legacy)',
      admin: {
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'descriptionSmall', type: 'textarea', localized: true },
        { name: 'description', type: 'richText', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'processes',
      label: 'Process (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'step', type: 'number' },
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'stories',
      label: 'Stories Section (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'caseStudy', type: 'relationship', relationTo: 'case-studies' },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'quote', type: 'textarea', localized: true },
        { name: 'quote2', type: 'textarea', localized: true },
        { name: 'author', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'companyLogo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'referenceLogos',
      type: 'array',
      label: 'Reference Logos (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      type: 'group',
      name: 'testimonialsSection',
      label: 'Testimonials Section Metadata (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'titleSmallDescription', type: 'textarea', localized: true },
        { name: 'displayAllReferencesLink', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'question', type: 'text', localized: true },
        { name: 'answer', type: 'richText', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'faqSection',
      label: 'FAQ Section Metadata (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
      ],
    },
    {
      type: 'group',
      name: 'aboutZeo',
      label: 'About Zeo Section (Legacy)',
      admin: {
        description: 'Deprecated: Use Lexical Blocks Layout instead',
        readOnly: true,
        hidden: true,
      },
      fields: [
        { name: 'titleSmall', type: 'text', localized: true },
        { name: 'titleBig', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          type: 'group',
          name: 'subSection1',
          label: 'Sub Section 1',
          fields: [
            { name: 'titleSmall', type: 'text', localized: true },
            { name: 'titleBig', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'logo1', type: 'upload', relationTo: 'media' },
            { name: 'logo2', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          type: 'group',
          name: 'subSection2',
          label: 'Sub Section 2',
          fields: [
            { name: 'titleSmall', type: 'text', localized: true },
            { name: 'titleBig', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'logo1', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          type: 'group',
          name: 'subSection3',
          label: 'Sub Section 3',
          fields: [
            { name: 'titleSmall', type: 'text', localized: true },
            { name: 'titleBig', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'logo1', type: 'upload', relationTo: 'media' },
            { name: 'logo2', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          type: 'group',
          name: 'attendedConferences',
          label: 'Attended Conferences',
          fields: [
            { name: 'titleLine1', type: 'text', localized: true },
            { name: 'titleLine2', type: 'text', localized: true },
            { name: 'titleLine3', type: 'text', localized: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'url', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'tools',
          label: 'Tools',
          fields: [
            { name: 'titleLine1', type: 'text', localized: true },
            { name: 'titleLine2', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'url', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text', localized: true, maxLength: 60 },
        { name: 'description', type: 'textarea', localized: true, maxLength: 160 },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'datoId',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', description: 'DatoCMS migration ID' },
    },
  ],
}
