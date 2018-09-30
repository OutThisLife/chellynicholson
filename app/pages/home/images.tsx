import Gallery, { Card } from '@/components/gallery'
import { random } from 'animejs'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

interface TOutter {
  folder: string
  variant?: 'normal' | 'fancy'
  onMouse: React.MouseEventHandler<any>
}

interface TInner {
  data: Response
}

interface Response {
  gallery: {
    data: Array<
      DropboxTypes.files.FileMetadata & {
        files: DropboxTypes.files.GetTemporaryLinkResult[]
      }
    >
  }
}

export default compose<TInner & TOutter, TOutter>(
  graphql<TOutter, Response>(
    gql`
      query featuredPosts($path: String!) {
        gallery(path: $path) {
          data
        }
      }
    `,
    {
      options: ({ folder }) => ({
        variables: { path: folder }
      })
    }
  )
)(
  ({ variant = 'normal', data, ...props }) =>
    data.gallery && (
      <Gallery variant={variant}>
        {data.gallery.data.map(({ id, name, files }) => (
          <Card key={id} name={name} img={files[random(0, files.length - 1)].link} {...props} />
        ))}
      </Gallery>
    )
)
