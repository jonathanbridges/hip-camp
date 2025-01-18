/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/Profile'
import { Route as NotFoundImport } from './routes/NotFound'
import { Route as ListingsImport } from './routes/Listings'
import { Route as ListingImport } from './routes/Listing'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/Profile',
  path: '/Profile',
  getParentRoute: () => rootRoute,
} as any)

const NotFoundRoute = NotFoundImport.update({
  id: '/NotFound',
  path: '/NotFound',
  getParentRoute: () => rootRoute,
} as any)

const ListingsRoute = ListingsImport.update({
  id: '/Listings',
  path: '/Listings',
  getParentRoute: () => rootRoute,
} as any)

const ListingRoute = ListingImport.update({
  id: '/Listing',
  path: '/Listing',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/Listing': {
      id: '/Listing'
      path: '/Listing'
      fullPath: '/Listing'
      preLoaderRoute: typeof ListingImport
      parentRoute: typeof rootRoute
    }
    '/Listings': {
      id: '/Listings'
      path: '/Listings'
      fullPath: '/Listings'
      preLoaderRoute: typeof ListingsImport
      parentRoute: typeof rootRoute
    }
    '/NotFound': {
      id: '/NotFound'
      path: '/NotFound'
      fullPath: '/NotFound'
      preLoaderRoute: typeof NotFoundImport
      parentRoute: typeof rootRoute
    }
    '/Profile': {
      id: '/Profile'
      path: '/Profile'
      fullPath: '/Profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/Listing': typeof ListingRoute
  '/Listings': typeof ListingsRoute
  '/NotFound': typeof NotFoundRoute
  '/Profile': typeof ProfileRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/Listing': typeof ListingRoute
  '/Listings': typeof ListingsRoute
  '/NotFound': typeof NotFoundRoute
  '/Profile': typeof ProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/Listing': typeof ListingRoute
  '/Listings': typeof ListingsRoute
  '/NotFound': typeof NotFoundRoute
  '/Profile': typeof ProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/Listing' | '/Listings' | '/NotFound' | '/Profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/Listing' | '/Listings' | '/NotFound' | '/Profile'
  id: '__root__' | '/' | '/Listing' | '/Listings' | '/NotFound' | '/Profile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ListingRoute: typeof ListingRoute
  ListingsRoute: typeof ListingsRoute
  NotFoundRoute: typeof NotFoundRoute
  ProfileRoute: typeof ProfileRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ListingRoute: ListingRoute,
  ListingsRoute: ListingsRoute,
  NotFoundRoute: NotFoundRoute,
  ProfileRoute: ProfileRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/Listing",
        "/Listings",
        "/NotFound",
        "/Profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/Listing": {
      "filePath": "Listing.tsx"
    },
    "/Listings": {
      "filePath": "Listings.tsx"
    },
    "/NotFound": {
      "filePath": "NotFound.tsx"
    },
    "/Profile": {
      "filePath": "Profile.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
