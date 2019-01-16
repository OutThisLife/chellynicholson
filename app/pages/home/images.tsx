import ImageGallery, { Card } from '@/components/gallery'
import { Post } from '@/server/schema'
import gql from 'graphql-tag'
import { DataValue, graphql } from 'react-apollo'
import { compose } from 'recompose'

interface TOutter {
  variant?: 'normal' | 'fancy'
  onMouse: React.MouseEventHandler<any>
}

interface TInner {
  data: DataValue<{ gallery: Post[] }>
}

export default compose<TInner & TOutter, TOutter>(
  graphql(gql`
    {
      gallery {
        id
        images {
          url
        }
        slug
        title
      }
    }
  `)
)(({ variant, data: { gallery = [] } }) => (
  <ImageGallery variant={variant || 'normal'}>
    {gallery.map(({ id, ...set }) => (
      <Card key={id} {...set} />
    ))}
  </ImageGallery>
))
