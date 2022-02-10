import Head from 'next/head'
import ArticleCard from '../components/articles/ArticleCard'
import ArticleWidget from '../components/articles/ArticleWidget'
import Categories from '../components/Categories'
import { getUID } from '../helpers/generalHelper'
import { getArticles } from '../services'
import { IArticle } from '../types/article'

type HomeProps = {
  articles: Array<IArticle>
}

export default function Home({ articles }: HomeProps) {
  return (
    <div className="container px-10 mx-auto mb-8 lg:px-20">
      <Head>
        <title>Language Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {articles.map((article) => (
            <ArticleCard article={article.node} key={getUID()} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <ArticleWidget slug="" categories={[]} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const articles = (await getArticles()) || []
  return {
    props: { articles },
  }
}
