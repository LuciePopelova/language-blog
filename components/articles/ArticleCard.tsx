import Link from 'next/link'
import React from 'react'
import AuthorDate from '../details/AuthorDate'
import { IArticle } from '../../types/article'

type Props = {
  article: IArticle | undefined
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  if (!article) {
    return (
      <div className="p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-9">
        <h1 className="mb-8 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-pink-600">
          No articles available...
        </h1>
      </div>
    )
  }

  return (
    <div className="p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-9">
      <div className="relative mb-6 overflow-hidden shadow-md pb-80">
        <img
          className="absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg"
          src={article.image?.url ?? 'no/image.jpg'}
          alt={article.title}
        />
      </div>
      <h1 className="mb-8 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-pink-600">
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h1>
      <AuthorDate
        name={article.author.name}
        url={article.author?.image?.url ?? '/noimage.jpg'}
        createdAt={article.createdAt}
      />
      <p className="px-4 mb-8 text-lg font-normal text-center text-gray-700 leg:px-20">
        {article.abstract}
      </p>
      <div className="text-center">
        <Link href={`/article/${article.slug}`}>
          <span className="inline-block px-8 py-3 text-lg font-medium text-white transition duration-500 transform bg-pink-500 rounded-full cursor-pointer hover:-translate-y-1">
            Continue reading...
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ArticleCard
