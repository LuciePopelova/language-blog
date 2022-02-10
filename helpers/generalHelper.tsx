import { performance } from 'perf_hooks'
import React from 'react'

export const getUID = () => {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ''
  )
}

export const getContentFragment = (
  key: string,
  text: string,
  obj: Record<string, any>,
  type: string
) => {
  let modifiedText: any = text

  if (obj) {
    if (obj.bold) {
      modifiedText = <b key={key}>{text}</b>
    }

    if (obj.italic) {
      modifiedText = <em key={key}>{text}</em>
    }

    if (obj.underline) {
      modifiedText = <u key={key}>{text}</u>
    }
  }

  switch (type) {
    case 'heading-three':
      return (
        <h3 key={key} className="px-4 mb-4 text-xl font-semibold">
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      )
    case 'paragraph':
      return (
        <p key={key} className="px-4 mb-8">
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      )
    case 'heading-four':
      return (
        <h4 key={key} className="px-4 mb-4 font-semibold text-md">
          {modifiedText.map((item: any, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      )
    case 'image':
      return (
        <img
          key={key}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      )
    default:
      return modifiedText
  }
}
