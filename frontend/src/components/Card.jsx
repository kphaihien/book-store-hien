import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from '../utils/getImgUrl';
import { Link } from 'react-router-dom';


const Card = ({book}) => {
  return (
    <>
          <div className="transition-shadow duration-300 rounded-lg ">
              <div
                  className="flex flex-col gap-4 sm:flex-row sm:items-center sm:h-72 sm:justify-center"
              >
                  <div className="border border-gray-400 rounded-md sm:h-72 sm:flex-shrink-0">
                      <a href="/">
                          <img
                              src={`${getImgUrl(book.coverImage)}`}
                              alt=""
                              className="w-full p-2 transition-all duration-200 bg-cover rounded-md cursor-pointer hover:scale-105"
                          />
                      </a>
                  </div>

                  <div>
                      <Link to={`/book/${book._id}`}
                      ><h3 className="mb-3 text-xl font-semibold hover:text-blue-600">
                              {book.title}
                          </h3></Link>
                      <p className="mb-5 text-gray-600">{book?.description?.length>60?`${book.description.slice(0,60)}...`:book?.description}</p>
                      <p className="mb-5 font-medium">
                          {book.newPrice}$ <span className="ml-2 font-normal line-through">{book.oldPrice}$</span>
                      </p>
                      <button className="flex items-center gap-1 px-6 py-1 space-x-1 transition transform bg-yellow-400 rounded-md hover:scale-105 hover:bg-purple-700 hover:font-bold hover:text-yellow-500">
                          <FiShoppingCart className="" />
                          <span>Add to Cart</span>
                      </button>
                  </div>
              </div>
          </div>
    </>
  )
}

export default Card