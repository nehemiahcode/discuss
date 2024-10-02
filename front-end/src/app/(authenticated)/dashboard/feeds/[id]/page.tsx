import React from 'react'

interface Params {
    params:{
        id:string
    }
}

function FeedDetails({params}:Params) {
  return (
    <div>{params.id}</div>
  )
}

export default FeedDetails


