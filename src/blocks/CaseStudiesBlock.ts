import type { Block } from 'payload'

export const CaseStudiesBlock: Block = {
  slug: 'caseStudies',
  labels: {
    singular: 'Case Studies',
    plural: 'Case Studies',
  },
  fields: [
    {
      name: 'caseStudies',
      label: 'Featured Case Studies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxRows: 3,
    },
    {
      name: 'references',
      label: 'Client References',
      type: 'relationship',
      relationTo: 'customer-references',
      hasMany: true,
    },
  ],
}
