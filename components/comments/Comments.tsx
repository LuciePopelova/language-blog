import parse from 'html-react-parser'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getUID } from '../../helpers/generalHelper'
import { getComments } from '../../services'
import { IComment } from '../../types/comment'

type Props = {
  slug: string
}

const Comments: React.FC<Props> = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then((res) => {
      setComments(res)
    })
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
          <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
            {comments.length} Comments
          </h3>
          {comments.map((comment: IComment) => (
            <div key={getUID()} className="pb-4 mb-4 border-b border-gray-100">
              <p className="mb-4">
                <span className="font-sembiold">{comment.name}</span> (
                {moment(comment.createdAt).format('DD.MM.YYYY')})
              </p>
              <p className="w-full text-gray-600 whitespace-pre-line">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
