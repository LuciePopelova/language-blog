import { request, gql } from 'graphql-request'
import { IComment } from '../types/comment'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? ''

export const getArticles = async () => {
  try {
    const query = gql`
      query GetArticles {
        articlesConnection {
          edges {
            node {
              title
              slug
              createdAt
              abstract
              author {
                bio
                name
                id
                image {
                  url
                }
                createdAt
              }
              image {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `

    const result = await request(graphqlAPI, query)
    return result.articlesConnection.edges
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getArticleDetails = async (slug: string) => {
  try {
    const query = gql`
      query GetArticleDetails($slug: String!) {
        article(where: { slug: $slug }) {
          title
          slug
          createdAt
          abstract
          author {
            bio
            name
            id
            image {
              url
            }
            createdAt
          }
          image {
            url
          }
          categories {
            name
            slug
          }
          content {
            raw
          }
        }
      }
    `
    const result = await request(graphqlAPI, query, { slug })
    return result.article
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getRecentArticles = async () => {
  try {
    const query = gql`
  query GetRecentArticles() {
    articles(orderBy: createdAt_ASC,
    last: 3) {
      title
      image {
        url
      }
      createdAt
      slug
    }
  }`

    const result = await request(graphqlAPI, query)
    return result.articles
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSimilarArticles = async (
  categories: Array<string>,
  slug: string
) => {
  try {
    const query = gql`
      query GetSimilarArticles($slug: String!, $categories: [String!]) {
        articles(
          where: {
            slug_not: $slug
            AND: { categories_some: { slug_in: $categories } }
          }
          last: 3
        ) {
          title
          image {
            url
          }
          createdAt
          slug
        }
      }
    `

    const result = await request(graphqlAPI, query, { slug, categories })
    return result.articles
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getCategories = async () => {
  try {
    const query = gql`
      query GetCategories {
        categories {
          name
          slug
        }
      }
    `

    const result = await request(graphqlAPI, query)
    return result.categories
  } catch (error) {
    console.log(error)
    return []
  }
}

export const submitComment = async (obj: IComment) => {
  try {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })

    return result.json()
  } catch (error) {
    console.error(error)
  }
}

export const getComments = async (slug: string) => {
  try {
    const query = gql`
      query GetComments($slug: String!) {
        comments(where: { article: { slug: $slug } }) {
          name
          comment
          createdAt
        }
      }
    `

    const result = await request(graphqlAPI, query, { slug })
    return result.comments
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getCategoryArticles = async (slug: string) => {
  try {
    const query = gql`
      query GetCategoryArticles($slug: String!) {
        articlesConnection(where: { categories_some: { slug: $slug } }) {
          edges {
            node {
              title
              slug
              createdAt
              abstract
              author {
                bio
                name
                id
                image {
                  url
                }
                createdAt
              }
              image {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `

    const result = await request(graphqlAPI, query, { slug })
    return result.articlesConnection.edges
  } catch (error) {
    console.error(error)
    return []
  }
}
