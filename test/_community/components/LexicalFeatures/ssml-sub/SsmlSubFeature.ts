import { $createTextNode, $getSelection } from 'lexical'

import type { FeatureProvider } from '../../../../../packages/richtext-lexical/src'

import { FormatSectionWithEntries } from '../../../../../packages/richtext-lexical/src'
import { SsmlSubIcon } from './SsmlSubIcon'
import { $createSsmlSubNode, $isSsmlSubNode, SsmlSubNode } from './SsmlSubNode'

export const SsmlSubFeature = (): FeatureProvider => ({
  feature: () => ({
    nodes: [
      {
        node: SsmlSubNode,
        type: SsmlSubNode.getType(),
      },
    ],
    floatingSelectToolbar: {
      sections: [
        FormatSectionWithEntries([
          {
            ChildComponent: SsmlSubIcon,
            isActive: ({ selection }) => {
              const nodes = selection.getNodes()
              const [firstNode] = nodes
              if (nodes.length === 1 && $isSsmlSubNode(firstNode)) return true
              return false
            },
            key: 'ssml-sub',
            onClick: ({ editor }) => {
              editor.update(() => {
                const selection = $getSelection()
                if (!selection) return

                // remove ssml sub node
                const nodes = selection.getNodes()
                const [firstNode] = nodes
                if (nodes.length === 1 && $isSsmlSubNode(firstNode)) {
                  const textNode = $createTextNode(firstNode.getTextContent())
                  selection.insertNodes([textNode])
                  return
                }

                // add ssml sub node
                const text = selection.getTextContent()
                // TODO: replace with a better prompt
                // eslint-disable-next-line no-alert
                const alias = window.prompt('Enter alias')
                if (!alias) return
                const ssmlSubNode = $createSsmlSubNode(text, alias)
                selection.insertNodes([ssmlSubNode])
              })
            },
            order: 8,
          },
        ]),
      ],
    },
    props: null,
  }),
  key: 'ssml-sub',
})
