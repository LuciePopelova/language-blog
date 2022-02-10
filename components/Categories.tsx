import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services'
import { ICategory } from '../types/category'

const Categories = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])
  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">Categories</h3>
      {categories instanceof Array &&
        categories.map((category: ICategory) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="block pb-3 mb-3 cursor-pointer">
              {category.name}
            </span>
          </Link>
        ))}
    </div>
  )
}

export default Categories
