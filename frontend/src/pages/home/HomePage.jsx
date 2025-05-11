import React from 'react'

import TopSellers from './TopSellers'
import Recommended from './Recommended'
import News from './News'
import Banner from "../../components/Banner"

const HomePage = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommended/>
        <News/>
    </>
  )
}

export default HomePage