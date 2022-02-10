import React from 'react'
import AuthorDate from '../details/AuthorDate'
import { getContentFragment, getUID } from '../../helpers/generalHelper'
import { IArticle } from '../../types/article'

type Props = {
  article: IArticle
}

const ArticleDetail: React.FC<Props> = ({ article }) => {
  return (
    <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          className="object-top w-full h-full rounded-t-lg"
          src={article.image?.url ?? '/noimage.jpg'}
          alt={article.title}
        />
      </div>
      <AuthorDate
        name={article.author.name}
        url={article.author?.image?.url ?? '/noimage.jpg'}
        createdAt={article.createdAt}
      />
      <h1 className="px-4 my-4 text-3xl font-semibold">{article.title}</h1>
      {article.content.raw.children.map((typeObj: Record<string, any>) => {
        const children = typeObj.children.map((item: Record<string, any>) =>
          getContentFragment(getUID(), item.text, item, '')
        )

        return getContentFragment(getUID(), children, typeObj, typeObj.type)
      })}
    </div>
  )
}

export default ArticleDetail
