import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services'
import { ICategory } from '../types/category'

const Header = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  return (
    <div className="container px-10 mx-auto mb-8 lg:px-20">
      <div className="inline-block w-full py-8 border-b">
        <div className="block md:float-left">
          <Link href="/">
            <span className="text-4xl font-bold text-white cursor-pointer">
              Language Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories instanceof Array &&
            categories.map((category: ICategory) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right">
                  {category.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Header
