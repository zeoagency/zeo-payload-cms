import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

// System Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Menus } from './collections/Menus'
import { Pages } from './collections/Pages'
import { Redirects } from './collections/Redirects'

// Content Collections
import { Articles } from './collections/Articles'
import { Guides } from './collections/Guides'
import { Books } from './collections/Books'
import { Videos } from './collections/Videos'
import { Podcasts } from './collections/Podcasts'
import { Services } from './collections/Services'
import { CaseStudies } from './collections/CaseStudies'
import { StaticArticles } from './collections/StaticArticles'

// Dictionary Collections
import { SeoDictionaryTerms } from './collections/SeoDictionaryTerms'
import { AiDictionaryTerms } from './collections/AiDictionaryTerms'

// Event Collections
import { AlgorithmUpdates } from './collections/AlgorithmUpdates'
import { Events } from './collections/Events'
import { Webinars } from './collections/Webinars'
import { OpenPositions } from './collections/OpenPositions'

// Tool Collections
import { Tools } from './collections/Tools'
import { MarketingTools } from './collections/MarketingTools'
import { SeoChecklists } from './collections/SeoChecklists'
import { Packages } from './collections/Packages'

// Taxonomy Collections
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { CustomerReferenceCategories } from './collections/CustomerReferenceCategories'

// Entity Collections
import { CustomerReferences } from './collections/CustomerReferences'

// Form Submissions
import { ContactMessages } from './collections/ContactMessages'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { JobApplications } from './collections/JobApplications'
import { MeetupRegistrations } from './collections/MeetupRegistrations'
import { SponsorApplications } from './collections/SponsorApplications'

// Globals
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'
import { PageSettings } from './globals/PageSettings'
import { Translations } from './globals/Translations'
import { TeamPage } from './globals/TeamPage'
import { CulturePage } from './globals/CulturePage'
import { EventsPage } from './globals/EventsPage'
import { ResourcesPage } from './globals/ResourcesPage'
import { ToolsPage } from './globals/ToolsPage'
import { SeoDictionaryPage } from './globals/SeoDictionaryPage'
import { AiDictionaryPage } from './globals/AiDictionaryPage'
import { AlgorithmUpdatesPage } from './globals/AlgorithmUpdatesPage'
import { DigitalzonePage } from './globals/DigitalzonePage'
import { MeetupPage } from './globals/MeetupPage'
import { GeoPage } from './globals/GeoPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate):?/))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // System
    Users,
    Media,
    Menus,
    Pages,
    Redirects,
    // Content
    Articles,
    Guides,
    Books,
    Videos,
    Podcasts,
    Services,
    CaseStudies,
    StaticArticles,
    // Dictionaries
    SeoDictionaryTerms,
    AiDictionaryTerms,
    // Events
    AlgorithmUpdates,
    Events,
    Webinars,
    OpenPositions,
    // Tools
    Tools,
    MarketingTools,
    SeoChecklists,
    Packages,
    // Taxonomy
    Categories,
    Tags,
    CustomerReferenceCategories,
    // Entities
    CustomerReferences,
    // Form Submissions
    ContactMessages,
    ContactSubmissions,
    JobApplications,
    MeetupRegistrations,
    SponsorApplications,
  ],
  globals: [
    Homepage,
    SiteSettings,
    PageSettings,
    Translations,
    TeamPage,
    CulturePage,
    EventsPage,
    ResourcesPage,
    ToolsPage,
    SeoDictionaryPage,
    AiDictionaryPage,
    AlgorithmUpdatesPage,
    DigitalzonePage,
    MeetupPage,
    GeoPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
