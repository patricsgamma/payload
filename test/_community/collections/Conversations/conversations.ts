import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { text } from '../../../../packages/payload/src/fields/validations'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  admin: {
    group: 'Conversations',
    useAsTitle: 'key',
    defaultColumns: ['key', 'question'],
  },
  hooks: {
    // beforeValidate: [populateNavigation, validateNavigation],
  },
  fields: [
    {
      type: 'text',
      name: 'key',
      label: 'Key',
      unique: true,
      required: true,
      validate: (val, args) => {
        // eslint-disable-next-line no-useless-escape
        const pattern = /^[a-z\d.\-]*$/

        if (pattern.test(val)) {
          return text(val, args)
        }
        return 'Key must match "labster.product.context.name" pattern'
      },
    },
    {
      type: 'group',
      name: 'navigation',
      admin: {
        condition: (props) => props?.navigation,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'inlet',
              label: 'Inlet',
              admin: {
                condition: (props) => props?.navigation?.inlet,
                readOnly: true,
                width: '33.33%',
              },
            },
            {
              type: 'textarea',
              name: 'conversations',
              label: 'Conversation References',
              admin: {
                condition: (props) => props?.navigation?.conversations,
                readOnly: true,
                width: '33.33%',
              },
            },
            {
              type: 'textarea',
              name: 'outlets',
              label: 'Outlets',
              admin: {
                condition: (props) => props?.navigation?.outlets,
                readOnly: true,
                width: '33.33%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'conversationTexts',
      label: 'Conversation Texts',
      fields: [
        {
          type: 'relationship',
          name: 'text',
          label: 'Conversation Text',
          relationTo: 'conversation-texts',
          required: true,
        },
      ],
    },
    {
      type: 'text',
      name: 'descriptor',
      label: 'Descriptor',
      required: true,
      access: {
        update: () => false,
      },
      admin: {
        description: 'This is a stripped relationship field',
      },
    },
  ],
  custom: {
    addLastModified: true,
    secureRequiredRelations: true,
    addFormatEndpoint: true,
  },
  access: {
    // create: hasAccessRole(Role.Admin, Role.ContentAdmin),
    // update: hasAccessRole(Role.Admin, Role.ContentAdmin),
    // delete: hasAccessRole(Role.Admin, Role.ContentAdmin),
  },
}
