import * as React from 'react'

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured?',
      type: 'boolean'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' }
    },
    {
      name: 'body',
      title: 'Copy',
      type: 'blockContent'
    }
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      images: 'images'
    },

    prepare(p) {
      return {
        title: p.title,
        subtitle: p.slug.current,
        media: (
          <img
            src={`//cdn.sanity.io/images/nuh72ar6/gallery/${p.images[0].asset._ref
              .replace(/^image-/, '')
              .replace(
                /-(jpg|png|jpeg|gif)$/im,
                (_, p1) => `.${p1}`
              )}?w=80&h=80&fit=crop`}
            alt={p.slug}
          />
        )
      }
    }
  }
}
