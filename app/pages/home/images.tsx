import ImageGallery, { Card } from '@/components/gallery'
import { Post } from '@/server/schema'
import gql from 'graphql-tag'
import orderBy from 'lodash/orderBy'
import { DataValue, graphql } from 'react-apollo'
import { compose, defaultProps, setDisplayName } from 'recompose'

interface TOutter {
  variant?: 'normal' | 'fancy'
  onMouse: React.MouseEventHandler<any>
}

interface TInner {
  data: DataValue<{ gallery: Post[] }>
}

export default compose<TInner & TOutter, TOutter>(
  setDisplayName('images'),
  defaultProps({ variant: 'normal' }),
  graphql(gql`
    {
      gallery {
        id
        featured
        images {
          url
        }
        slug
        title
      }
    }
  `)
)(({ variant, data: { gallery = [] }, ...props }) => (
  <ImageGallery variant={variant}>
    {orderBy(
      gallery.filter(g => (variant === 'fancy' ? g.featured : !g.featured)),
      'order'
    ).map(set => (
      <Card key={set.id} {...set} {...props} />
    ))}
  </ImageGallery>
))
