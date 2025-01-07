/** @type {import('next').NextConfig} */

import { withPlausibleProxy } from 'next-plausible'
import withYaml from 'next-plugin-yaml'
import { execSync } from 'child_process'
const commitHash = execSync('git log --pretty=format:"%h" -n1')
  .toString()
  .trim()
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  env: {
    COMMIT_HASH: commitHash,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.slack-edge.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
}

const sentryContext = {
  org: 'malted',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

const plausibleConfig = withPlausibleProxy()(nextConfig)

const yamlConfig = withYaml(plausibleConfig)

export default withSentryConfig(yamlConfig, sentryContext)
