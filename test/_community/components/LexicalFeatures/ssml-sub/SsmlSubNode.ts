import type { EditorConfig, LexicalNode, NodeKey, SerializedTextNode } from 'lexical'

import { TextNode } from 'lexical'

// SSML stands for Speech Synthesis Markup Language
// sub (that stands for substitute) is a SSML tag which indicates that the text in the
// alias attribute value replaces the contained text for pronunciation
// https://cloud.google.com/text-to-speech/docs/ssml#sub
export class SsmlSubNode extends TextNode {
  __alias: string

  constructor(text: string, alias: string, key?: NodeKey) {
    super(text, key)
    this.__alias = alias
  }

  static clone(node: SsmlSubNode): SsmlSubNode {
    return new SsmlSubNode(node.__text, node.__alias, node.__key)
  }

  static getType(): string {
    return 'ssml_sub'
  }

  static importJSON(serializedNode: SerializedTextNode): SsmlSubNode {
    const subNode = serializedNode as unknown as SsmlSubNode // TODO: fix this
    // eslint-disable-next-line no-use-before-define
    const node = $createSsmlSubNode(subNode.text, subNode.alias)
    node.setFormat(subNode.format)
    node.setDetail(subNode.detail)
    node.setMode(subNode.mode)
    node.setStyle(subNode.style)
    return node
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config)
    element.className = 'ssml-sub-node'
    element.setAttribute('data-after', this.getAlias())
    return element
  }

  exportJSON() {
    return {
      detail: this.getDetail(),
      format: this.getFormat(),
      mode: this.getMode(),
      style: this.getStyle(),
      text: this.getTextContent(),
      type: this.getType(),
      alias: this.getAlias(),
      version: 1,
    }
  }

  getAlias(): string {
    return this.__alias
  }

  setAlias(alias: string) {
    this.__alias = alias
  }
}

export function $createSsmlSubNode(text: string, alias: string): SsmlSubNode {
  return new SsmlSubNode(text, alias)
}

export function $isSsmlSubNode(node: LexicalNode | null | undefined): node is SsmlSubNode {
  return node instanceof SsmlSubNode
}
