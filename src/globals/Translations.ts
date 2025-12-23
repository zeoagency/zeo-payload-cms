import type { GlobalConfig } from 'payload'

export const Translations: GlobalConfig = {
  slug: 'translations',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Navigation
    {
      name: 'navigation',
      type: 'group',
      label: 'Navigation',
      fields: [
        { name: 'home', type: 'text', localized: true, defaultValue: 'Home' },
        { name: 'about', type: 'text', localized: true, defaultValue: 'About' },
        { name: 'services', type: 'text', localized: true, defaultValue: 'Services' },
        { name: 'caseStudies', type: 'text', localized: true, defaultValue: 'Case Studies' },
        { name: 'resources', type: 'text', localized: true, defaultValue: 'Resources' },
        { name: 'blog', type: 'text', localized: true, defaultValue: 'Blog' },
        { name: 'contact', type: 'text', localized: true, defaultValue: 'Contact' },
        { name: 'team', type: 'text', localized: true, defaultValue: 'Team' },
        { name: 'culture', type: 'text', localized: true, defaultValue: 'Culture' },
        { name: 'events', type: 'text', localized: true, defaultValue: 'Events' },
        { name: 'tools', type: 'text', localized: true, defaultValue: 'Tools' },
        { name: 'references', type: 'text', localized: true, defaultValue: 'References' },
      ],
    },

    // Common UI Elements
    {
      name: 'common',
      type: 'group',
      label: 'Common UI',
      fields: [
        { name: 'readMore', type: 'text', localized: true, defaultValue: 'Read More' },
        { name: 'learnMore', type: 'text', localized: true, defaultValue: 'Learn More' },
        { name: 'viewAll', type: 'text', localized: true, defaultValue: 'View All' },
        { name: 'seeAll', type: 'text', localized: true, defaultValue: 'See All' },
        { name: 'loadMore', type: 'text', localized: true, defaultValue: 'Load More' },
        { name: 'search', type: 'text', localized: true, defaultValue: 'Search' },
        { name: 'filter', type: 'text', localized: true, defaultValue: 'Filter' },
        { name: 'filterAll', type: 'text', localized: true, defaultValue: 'All' },
        { name: 'submit', type: 'text', localized: true, defaultValue: 'Submit' },
        { name: 'send', type: 'text', localized: true, defaultValue: 'Send' },
        { name: 'close', type: 'text', localized: true, defaultValue: 'Close' },
        { name: 'cancel', type: 'text', localized: true, defaultValue: 'Cancel' },
        { name: 'loading', type: 'text', localized: true, defaultValue: 'Loading...' },
        { name: 'error', type: 'text', localized: true, defaultValue: 'Error' },
        { name: 'success', type: 'text', localized: true, defaultValue: 'Success' },
        { name: 'download', type: 'text', localized: true, defaultValue: 'Download' },
        { name: 'upload', type: 'text', localized: true, defaultValue: 'Upload' },
        { name: 'share', type: 'text', localized: true, defaultValue: 'Share' },
        { name: 'copy', type: 'text', localized: true, defaultValue: 'Copy' },
        { name: 'copied', type: 'text', localized: true, defaultValue: 'Copied!' },
      ],
    },

    // Resource Types
    {
      name: 'resourceTypes',
      type: 'group',
      label: 'Resource Types',
      fields: [
        { name: 'article', type: 'text', localized: true, defaultValue: 'article' },
        { name: 'articles', type: 'text', localized: true, defaultValue: 'articles' },
        { name: 'guide', type: 'text', localized: true, defaultValue: 'guide' },
        { name: 'guides', type: 'text', localized: true, defaultValue: 'guides' },
        { name: 'video', type: 'text', localized: true, defaultValue: 'video' },
        { name: 'videos', type: 'text', localized: true, defaultValue: 'videos' },
        { name: 'book', type: 'text', localized: true, defaultValue: 'book' },
        { name: 'books', type: 'text', localized: true, defaultValue: 'books' },
        { name: 'podcast', type: 'text', localized: true, defaultValue: 'podcast' },
        { name: 'podcasts', type: 'text', localized: true, defaultValue: 'podcasts' },
        { name: 'webinar', type: 'text', localized: true, defaultValue: 'webinar' },
        { name: 'webinars', type: 'text', localized: true, defaultValue: 'webinars' },
      ],
    },

    // Homepage Specific
    {
      name: 'homepage',
      type: 'group',
      label: 'Homepage',
      fields: [
        { name: 'successStories', type: 'text', localized: true, defaultValue: 'Success Stories' },
        { name: 'successStoriesTitle', type: 'text', localized: true, defaultValue: 'We Succeeded Together with Our Clients' },
        { name: 'successStoriesDescription', type: 'text', localized: true, defaultValue: 'Some of our projects' },
        { name: 'ourServices', type: 'text', localized: true, defaultValue: 'Our Services' },
        { name: 'whatWeDo', type: 'text', localized: true, defaultValue: 'What We Do' },
        { name: 'clientTestimonials', type: 'text', localized: true, defaultValue: 'Client Testimonials' },
        { name: 'ourResources', type: 'text', localized: true, defaultValue: 'Our Resources' },
        { name: 'internationalPresence', type: 'text', localized: true, defaultValue: 'International Presence' },
        { name: 'getInTouch', type: 'text', localized: true, defaultValue: 'Get In Touch' },
      ],
    },

    // Case Studies
    {
      name: 'caseStudies',
      type: 'group',
      label: 'Case Studies',
      fields: [
        { name: 'caseStudy', type: 'text', localized: true, defaultValue: 'Case Study' },
        { name: 'challenge', type: 'text', localized: true, defaultValue: 'Challenge' },
        { name: 'solution', type: 'text', localized: true, defaultValue: 'Solution' },
        { name: 'results', type: 'text', localized: true, defaultValue: 'Results' },
        { name: 'relatedCaseStudies', type: 'text', localized: true, defaultValue: 'Related Case Studies' },
      ],
    },

    // Forms
    {
      name: 'forms',
      type: 'group',
      label: 'Forms',
      fields: [
        { name: 'name', type: 'text', localized: true, defaultValue: 'Name' },
        { name: 'firstName', type: 'text', localized: true, defaultValue: 'First Name' },
        { name: 'lastName', type: 'text', localized: true, defaultValue: 'Last Name' },
        { name: 'email', type: 'text', localized: true, defaultValue: 'Email' },
        { name: 'phone', type: 'text', localized: true, defaultValue: 'Phone' },
        { name: 'company', type: 'text', localized: true, defaultValue: 'Company' },
        { name: 'message', type: 'text', localized: true, defaultValue: 'Message' },
        { name: 'subject', type: 'text', localized: true, defaultValue: 'Subject' },
        { name: 'send', type: 'text', localized: true, defaultValue: 'Send' },
        { name: 'required', type: 'text', localized: true, defaultValue: 'Required' },
        { name: 'optional', type: 'text', localized: true, defaultValue: 'Optional' },
        { name: 'pleaseWait', type: 'text', localized: true, defaultValue: 'Please wait...' },
        { name: 'successMessage', type: 'text', localized: true, defaultValue: 'Thank you! Your message has been sent.' },
        { name: 'errorMessage', type: 'text', localized: true, defaultValue: 'An error occurred. Please try again.' },
      ],
    },

    // Newsletter
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        { name: 'title', type: 'text', localized: true, defaultValue: 'Subscribe to Our Newsletter' },
        { name: 'description', type: 'text', localized: true, defaultValue: 'Stay updated with our latest news and insights' },
        { name: 'emailPlaceholder', type: 'text', localized: true, defaultValue: 'Your email address' },
        { name: 'subscribe', type: 'text', localized: true, defaultValue: 'Subscribe' },
        { name: 'successMessage', type: 'text', localized: true, defaultValue: 'Successfully subscribed!' },
        { name: 'errorMessage', type: 'text', localized: true, defaultValue: 'Subscription failed. Please try again.' },
      ],
    },

    // Time & Date
    {
      name: 'time',
      type: 'group',
      label: 'Time & Date',
      fields: [
        { name: 'readingTime', type: 'text', localized: true, defaultValue: 'min read' },
        { name: 'publishedOn', type: 'text', localized: true, defaultValue: 'Published on' },
        { name: 'updatedOn', type: 'text', localized: true, defaultValue: 'Updated on' },
        { name: 'ago', type: 'text', localized: true, defaultValue: 'ago' },
        { name: 'today', type: 'text', localized: true, defaultValue: 'Today' },
        { name: 'yesterday', type: 'text', localized: true, defaultValue: 'Yesterday' },
      ],
    },

    // Author & Content
    {
      name: 'content',
      type: 'group',
      label: 'Content',
      fields: [
        { name: 'by', type: 'text', localized: true, defaultValue: 'By' },
        { name: 'author', type: 'text', localized: true, defaultValue: 'Author' },
        { name: 'category', type: 'text', localized: true, defaultValue: 'Category' },
        { name: 'categories', type: 'text', localized: true, defaultValue: 'Categories' },
        { name: 'tag', type: 'text', localized: true, defaultValue: 'Tag' },
        { name: 'tags', type: 'text', localized: true, defaultValue: 'Tags' },
        { name: 'relatedContent', type: 'text', localized: true, defaultValue: 'Related Content' },
        { name: 'tableOfContents', type: 'text', localized: true, defaultValue: 'Table of Contents' },
        { name: 'summary', type: 'text', localized: true, defaultValue: 'Summary' },
      ],
    },

    // SEO & Dictionary
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Dictionary',
      fields: [
        { name: 'seoDictionary', type: 'text', localized: true, defaultValue: 'SEO Dictionary' },
        { name: 'aiDictionary', type: 'text', localized: true, defaultValue: 'AI Dictionary' },
        { name: 'definition', type: 'text', localized: true, defaultValue: 'Definition' },
        { name: 'relatedTerms', type: 'text', localized: true, defaultValue: 'Related Terms' },
        { name: 'algorithmUpdates', type: 'text', localized: true, defaultValue: 'Algorithm Updates' },
      ],
    },

    // Pagination & Navigation
    {
      name: 'pagination',
      type: 'group',
      label: 'Pagination',
      fields: [
        { name: 'previous', type: 'text', localized: true, defaultValue: 'Previous' },
        { name: 'next', type: 'text', localized: true, defaultValue: 'Next' },
        { name: 'page', type: 'text', localized: true, defaultValue: 'Page' },
        { name: 'of', type: 'text', localized: true, defaultValue: 'of' },
        { name: 'showing', type: 'text', localized: true, defaultValue: 'Showing' },
        { name: 'results', type: 'text', localized: true, defaultValue: 'results' },
      ],
    },

    // Events & Webinars
    {
      name: 'events',
      type: 'group',
      label: 'Events & Webinars',
      fields: [
        { name: 'upcomingEvents', type: 'text', localized: true, defaultValue: 'Upcoming Events' },
        { name: 'pastEvents', type: 'text', localized: true, defaultValue: 'Past Events' },
        { name: 'register', type: 'text', localized: true, defaultValue: 'Register' },
        { name: 'registered', type: 'text', localized: true, defaultValue: 'Registered' },
        { name: 'eventDate', type: 'text', localized: true, defaultValue: 'Event Date' },
        { name: 'location', type: 'text', localized: true, defaultValue: 'Location' },
        { name: 'online', type: 'text', localized: true, defaultValue: 'Online' },
        { name: 'speakers', type: 'text', localized: true, defaultValue: 'Speakers' },
      ],
    },

    // Footer
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        { name: 'contactUs', type: 'text', localized: true, defaultValue: 'Contact Us' },
        { name: 'followUs', type: 'text', localized: true, defaultValue: 'Follow Us' },
        { name: 'allRightsReserved', type: 'text', localized: true, defaultValue: 'All rights reserved' },
        { name: 'privacyPolicy', type: 'text', localized: true, defaultValue: 'Privacy Policy' },
        { name: 'termsOfService', type: 'text', localized: true, defaultValue: 'Terms of Service' },
        { name: 'offices', type: 'text', localized: true, defaultValue: 'Offices' },
      ],
    },

    // Misc
    {
      name: 'misc',
      type: 'group',
      label: 'Miscellaneous',
      fields: [
        { name: 'notFound', type: 'text', localized: true, defaultValue: 'Page not found' },
        { name: 'backToHome', type: 'text', localized: true, defaultValue: 'Back to Home' },
        { name: 'comingSoon', type: 'text', localized: true, defaultValue: 'Coming Soon' },
        { name: 'underConstruction', type: 'text', localized: true, defaultValue: 'Under Construction' },
        { name: 'noResults', type: 'text', localized: true, defaultValue: 'No results found' },
        { name: 'tryAgain', type: 'text', localized: true, defaultValue: 'Try again' },
      ],
    },

    {
      name: 'datoId',
      type: 'text',
      admin: { description: 'DatoCMS migration ID' },
    },
  ],
}
