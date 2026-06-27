declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types'
  import type { ComponentType } from 'react'

  export const frontmatter: unknown

  const Content: ComponentType<{ components?: MDXComponents }>
  export default Content
}
