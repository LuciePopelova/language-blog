import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ArticleDetail from '../../components/articles/ArticleDetail'
import ArticleWidget from '../../components/articles/ArticleWidget'
import Categories from '../../components/Categories'
import Comments from '../../components/comments/Comments'
import CommentsForm from '../../components/comments/CommentsForm'
import Author from '../../components/details/Author'
import Loader from '../../components/Loader'
import { getArticleDetails, getArticles } from '../../services'
import { IArticle } from '../../types/article'
import { ICategory } from '../../types/category'

type Props = {
  article: IArticle | null
}

const ArticleDetails: React.FC<Props> = ({ article }) => {
  const router = useRouter()

  if (!article) {
    return (
      <div className="py-12 mx-10 mb-8 bg-white rounded-lg shadow-lg lg:mx-40">
        <h1 className="mb-8 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-pink-600">
          This article is not available.
        </h1>
      </div>
    )
  }

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="container px-10 mx-auto mb-7 lg:px-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <ArticleDetail article={article} />
          <Author author={article.author} />
          <CommentsForm slug={article.slug} />
          <Comments slug={article.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <ArticleWidget
              categories={article.categories.map(
                (category: ICategory) => category.slug
              )}
              slug={article.slug}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string
  const data = (await getArticleDetails(slug)) || null
  return {
    props: { article: data },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles()

  return {
    paths: articles.map(({ node: { slug } }: Record<string, any>) => ({
      params: { slug },
    })),
    fallback: true,
  }
}
