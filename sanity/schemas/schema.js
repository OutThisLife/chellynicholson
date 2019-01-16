import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

import blockContent from './blockContent'
import category from './category'
import gallery from './gallery'
import post from './post'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([post, category, gallery, blockContent])
})
