import React from 'react'

type Props = {
  text: string
}

const PageTitle = (props: Props) => {
  return (
    <><h2 className="page-title text-secondary fw-bold">{props.text}</h2></>
  )
}

export default PageTitle