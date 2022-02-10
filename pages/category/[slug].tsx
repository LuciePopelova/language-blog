import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ArticleCard from '../../components/articles/ArticleCard'
import Categories from '../../components/Categories'
import Loader from '../../components/Loader'
import { getUID } from '../../helpers/generalHelper'
import { getCategories, getCategoryArticles } from '../../services'
import { IArticle } from '../../types/article'

type Props = {
  articles: Array<IArticle>
}

const CategoryArticles: React.FC<Props> = ({ articles }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="container px-10 mx-auto mb-8 lg:px-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard article={article.node} key={getUID()} />
            ))
          ) : (
            <div className="p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-9">
              <h1 className="mb-8 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-pink-600">
                No articles available...
              </h1>
            </div>
          )}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryArticles

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string
  const data = (await getCategoryArticles(slug)) || []

  return {
    props: { articles: data },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = (await getCategories()) || []

  return {
    paths: categories.map(({ slug }: Record<string, any>) => ({
      params: { slug },
    })),
    fallback: true,
  }
}
