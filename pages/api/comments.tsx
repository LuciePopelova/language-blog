import { gql, GraphQLClient } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''

export default async function comments(req: Request, res: any) {
  try {
    const graphqlClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    })

    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            article: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `

    const result = await graphqlClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}
