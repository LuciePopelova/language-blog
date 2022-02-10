import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getRecentArticles, getSimilarArticles } from '../../services/index'
import { IArticle } from '../../types/article'
import { ICategory } from '../../types/category'

type Props = {
  categories: Array<string>
  slug: string
}

const ArticleWidget: React.FC<Props> = ({ categories, slug }) => {
  const [articles, setArticle] = useState<Array<IArticle>>([])

  useEffect(() => {
    if (slug) {
      getSimilarArticles(categories, slug).then((result) => setArticle(result))
    } else {
      getRecentArticles().then((result) => setArticle(result))
    }
  }, [slug])

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? 'Related Articles' : 'Recent Articles'}
      </h3>
      {articles instanceof Array &&
        articles.map((article: Record<string, any>) => {
          return (
            <div key={article.title} className="flex items-center w-full mb-4">
              <div className="flex-none w-16">
                <img
                  alt={article.title}
                  height="60px"
                  width="60px"
                  className="align-middle rounded-full"
                  src={article.image.url}
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-500 font-xs">
                  {moment(article.createdAt).format('DD.MM.YYYY')}
                </p>
                <Link key={article.title} href={`/article/${article.slug}`}>
                  {article.title}
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ArticleWidget
