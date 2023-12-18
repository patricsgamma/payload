import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { text } from '../../../../packages/payload/src/fields/validations'
import {
  AlignFeature,
  BlocksFeature,
  BoldTextFeature,
  HeadingFeature,
  IndentFeature,
  ItalicTextFeature,
  LinkFeature,
  ParagraphFeature,
  StrikethroughTextFeature,
  SubscriptTextFeature,
  SuperscriptTextFeature,
  UnderlineTextFeature,
  UploadFeature,
  lexicalEditor,
} from '../../../../packages/richtext-lexical/src'
import { SsmlSubFeature } from '../../components/LexicalFeatures/ssml-sub/SsmlSubFeature'
import { NaviationActionBlock } from './navigation-action'

export const ConversationTexts: CollectionConfig = {
  slug: 'conversation-texts',
  admin: {
    group: 'Conversations',
    useAsTitle: 'key',
    defaultColumns: ['key', 'description', 'text'],
  },
  hooks: {
    // beforeValidate: [populateTextNavigation, validateTextNavigation],
    // beforeChange: [onTextChange, onSpokenTextChange],
    // afterChange: [createTTSJobHook],
  },
  fields: [
    {
      name: 'key',
      label: 'Key',
      type: 'text',
      unique: true,
      required: true,
      validate: (val, args) => {
        const pattern = /^[a-z\d.-]*$/
        if (pattern.test(val)) {
          return text(val, args)
        }
        return 'Key must match "product.context.name" pattern'
      },
      access: {
        update: () => false,
      },
    },
    {
      name: 'navigation',
      label: 'Navigation',
      type: 'json',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: false,
    },
    {
      name: 'text',
      label: 'Text',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: () => [
          HeadingFeature({
            enabledHeadingSizes: ['h1', 'h2', 'h3'],
          }),
          ParagraphFeature(),
          IndentFeature(),
          AlignFeature(),
          BoldTextFeature(),
          ItalicTextFeature(),
          StrikethroughTextFeature(),
          UnderlineTextFeature(),
          SubscriptTextFeature(),
          SuperscriptTextFeature(),
          LinkFeature({}),
          // Images disabled until we can control them better
          UploadFeature(),
          BlocksFeature({ blocks: [NaviationActionBlock] }),
          // TTS
          SsmlSubFeature(),
        ],
      }),
      localized: true,
    },
    {
      name: 'voiceActor',
      label: 'Voice Actor',
      type: 'text',
      required: true,
      admin: {
        description: 'This is a stripped relationship field',
      },
    },
    {
      type: 'array',
      name: 'spokenTexts',
      label: 'Spoken Texts',
      fields: [
        {
          name: 'spokenText',
          label: 'Spoken Text',
          type: 'textarea',
          localized: true,
          required: false,
          access: {
            // Local api automation does not need access, we can overwrite it
            create: () => false,
            update: () => false,
          },
        },
      ],
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      type: 'array',
      name: 'voiceAudios',
      label: 'Voice Audios',
      fields: [
        {
          name: 'voiceAudio',
          label: 'Voice Audio',
          type: 'text',
          required: false,
          localized: true,
          admin: {
            description: 'This is a stripped upload field',
          },
          access: {
            // Update only for Service user
            create: () => false,
            update: () => false,
          },
        },
      ],
      access: {
        create: () => false,
        update: () => false,
      },
    },
  ],
  access: {
    // create: hasAccessRole(Role.Admin, Role.ContentAdmin),
    // update: hasAccessRole(Role.Admin, Role.ContentAdmin),
    // delete: hasAccessRole(Role.Admin, Role.ContentAdmin),
  },
  custom: {
    addLastModified: true,
    secureRequiredRelations: true,
    addFormatEndpoint: true,
  },
}
