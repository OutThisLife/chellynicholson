export default {
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
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
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
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
      media: 'images'
    },

    prepare(p) {
      return {
        title: p.title,
        subtitle: p.slug.current,
        media: p.media
      }
    }
  }
}
