import type { Block } from '../../../../packages/payload/src/fields/config/types'

import {
  BoldTextFeature,
  ItalicTextFeature,
  LinkFeature,
  StrikethroughTextFeature,
  SubscriptTextFeature,
  SuperscriptTextFeature,
  UnderlineTextFeature,
  lexicalEditor,
} from '../../../../packages/richtext-lexical/src'
import { SsmlSubFeature } from '../../components/LexicalFeatures/ssml-sub/SsmlSubFeature'

export const NaviationActionBlock: Block = {
  slug: 'navigation', // required
  imageAltText: 'Navigation Action block to configure Conversation Sections relations',
  interfaceName: 'NaviationActionBlock', // optional
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'navigationType',
          type: 'select',
          options: [
            { label: 'Conversation Text', value: 'reference' },
            { label: 'Outlet', value: 'outlet' },
          ],
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'outletKey',
          label: 'Outlet',
          type: 'text',
          admin: {
            width: '66%',
            condition: (props) => {
              const key = Object.keys(props).find((k) => k.startsWith('navigation'))

              if (key) return props?.[key].navigationType === 'outlet'

              return false
            },
          },
        },
        {
          name: 'relationshipKey',
          label: 'Conversation Text',
          type: 'relationship',
          relationTo: 'conversation-texts',
          // Filter out ConversationText where NavigationBlock is embedded in
          filterOptions: (data) => ({
            id: {
              not_equals: data?.id,
            },
          }),
          admin: {
            width: '66%',
            condition: (props) => {
              const key = Object.keys(props).find((k) => k.startsWith('navigation'))

              if (key) return props?.[key].navigationType === 'reference'

              return false
            },
          },
        },
      ],
    },
    {
      name: 'text',
      label: 'Text',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [
          BoldTextFeature(),
          ItalicTextFeature(),
          StrikethroughTextFeature(),
          UnderlineTextFeature(),
          SubscriptTextFeature(),
          SuperscriptTextFeature(),
          LinkFeature({}),
          SsmlSubFeature(),
        ],
      }),
    },
  ],
}
