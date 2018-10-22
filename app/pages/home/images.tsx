import ImageGallery, { Card } from '@/components/gallery'
import { getGallery } from '@/lib/queries'
import { Gallery } from '@/server/schema'
import { random } from 'animejs'
import { DataValue } from 'react-apollo'
import { compose } from 'recompose'

interface TOutter {
  path: string
  variant?: 'normal' | 'fancy'
  onMouse: React.MouseEventHandler<any>
}

interface TInner {
  data: DataValue<{ gallery: Gallery[] }>
}

export default compose<TInner & TOutter, TOutter>(getGallery())(
  ({ variant = 'normal', data: { gallery = [] }, ...props }) => (
    <ImageGallery variant={variant}>
      {gallery.map(({ id, files, ...set }) => (
        <Card
          key={id}
          data-path={set.path}
          img={files.length ? files[random(0, files.length - 1)].url : ''}
          {...set}
          {...props}
        />
      ))}
    </ImageGallery>
  )
)
