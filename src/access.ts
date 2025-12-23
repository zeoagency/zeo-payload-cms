import type { Access } from 'payload'

// Check if user is authenticated
export const authenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

// Check if user is an admin
export const adminOnly: Access = ({ req: { user } }) => {
  return user?.roles?.includes('admin') ?? false
}

// Check if user is admin or editor
export const adminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || user.roles?.includes('editor')
}

// Allow anyone (public access)
export const anyone: Access = () => true

// Allow only the user themselves or admins
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  return { id: { equals: user.id } }
}

// Published content or authenticated users
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

// Published or own drafts
export const publishedOrOwnDrafts: Access = ({ req: { user } }) => {
  if (!user) return { _status: { equals: 'published' } }
  if (user.roles?.includes('admin')) return true
  return {
    or: [
      { _status: { equals: 'published' } },
      { and: [{ author: { equals: user.id } }, { _status: { equals: 'draft' } }] },
    ],
  }
}

// Author can edit own content
export const authorCanEditOwn: Access = ({ req: { user, data } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  // For updates, check if user is the author
  if (data?.author) {
    return data.author === user.id
  }
  // For creation, allow editors
  return user.roles?.includes('editor')
}

// Admin or editor can create
export const adminOrEditorCanCreate: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || user.roles?.includes('editor')
}

// Admin only field access (returns boolean only for field-level access)
export const adminOnlyField = ({
  req: { user },
}: {
  req: { user?: { roles?: string[] } }
}): boolean => {
  return user?.roles?.includes('admin') ?? false
}
