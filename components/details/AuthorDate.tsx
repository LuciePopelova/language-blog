import moment from 'moment'
import React from 'react'

type Props = {
  name: string
  url: string
  createdAt: Date
}
const AuthorDate: React.FC<Props> = ({ name, url, createdAt }) => {
  return (
    <div className="items-center justify-center block w-full mb-8 text-center bloc lg:flex">
      <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
        <img
          alt={name}
          height="30px"
          width="30px"
          className="align-middle rounded-full"
          src={url}
        />
        <p className="inline ml-2 text-lg text-gray-700 align-middle">{name}</p>
      </div>
      <div className="font-medium text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline w-6 h-6 mr-2 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{moment(createdAt).format('DD.MM.YYYY')}</span>
      </div>
    </div>
  )
}

export default AuthorDate
