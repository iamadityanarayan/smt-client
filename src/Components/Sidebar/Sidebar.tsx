import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const Sidebar = () => {
  return (
    <div className="sidebar mx-3 border-2 border-end ">
      <Nav className="nav-pills flex-column mb-auto me-3">
        {/* <NavLink
          className={(props) => {
            return `${props.isActive ? "active" : " inactive "
              } nav-link my-2 rounded-1`;
          }}
          to="/"
          end
        >
          Dashboard
        </NavLink> */}
        <NavLink
          className={(props) => {
            return `${
              props.isActive ? 'active' : ' inactive '
            } nav-link my-1 rounded-1`
          }}
          to="/"
          end>
          Experience
        </NavLink>
      </Nav>
    </div>
  )
}

export default Sidebar
