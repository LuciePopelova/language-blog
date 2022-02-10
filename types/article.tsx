import { IAuthor } from './author'
import { ICategory } from './category'

export interface IArticle {
  abstract: string
  author: IAuthor
  categories: Array<ICategory>
  content: { raw: Record<string, any> }
  createdAt: Date
  image: { url: string }
  node?: IArticle
  slug: string
  title: string
}
