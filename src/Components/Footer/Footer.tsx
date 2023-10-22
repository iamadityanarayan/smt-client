const Footer = () => {
  let date = new Date().getFullYear()
  return (
    <div className="container-fluid fixed-bottom">
      <p className="m-0 text-center border-top">
        COPYRIGHT {date}, AT Tools. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
