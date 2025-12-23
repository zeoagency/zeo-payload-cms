import type { Block } from 'payload'

export const WhatWeDoBlock: Block = {
  slug: 'whatWeDo',
  labels: {
    singular: 'What We Do',
    plural: 'What We Do Sections',
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
}
