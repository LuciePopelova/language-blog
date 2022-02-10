import React, { useState } from 'react'
import { validateEmail } from '../../helpers/validationHelper'
import { submitComment } from '../../services'
import { IComment } from '../../types/comment'

type Props = {
  slug: string
}

const CommentsForm: React.FC<Props> = ({ slug }) => {
  const [error, setError] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
  })

  const handleCommentSubmitClick = () => {
    const { name, email, comment } = formData
    setError(null)

    if (email && !validateEmail(email)) {
      setError('Email is invalid.')
      return
    } else if (!comment || !email || !name) {
      setError('All fields are required.')
      return
    }

    const commentObj: IComment = {
      name,
      email,
      comment,
      slug,
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setFormData((prevState) => ({
        ...prevState,
        formData: {
          name: null,
          email: null,
          comment: null,
        },
      }))
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event)
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event?.target.value,
    }))
  }

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
          onChange={handleInputChange}
          value={formData.comment ?? ''}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          value={formData.name ?? ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          value={formData.email ?? ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="mt-8">
        <button
          className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-pink-600 rounded-full cursor-pointer ease hover:bg-pink-800"
          type="button"
          onClick={handleCommentSubmitClick}
        >
          Submit
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
