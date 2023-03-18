import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
type Props = {}

const Siderbar = (props: Props) => {
  return (
    <div className="sidebar w-25 mx-3 border-2 border-end bg--light ">
      <Nav className="nav-pills flex-column mb-auto px-3">
        <NavLink
          className={(props) => {
            return `${props.isActive ? "active" : " inactive "
              } nav-link my-2 rounded-1`;
          }}
          to="na"
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className={(props) => {
            return `${props.isActive ? "active" : " inactive "
              } nav-link my-1 rounded-1`;
          }}
          to="wk"
          end
        >
          Experience
        </NavLink>
      </Nav>
    </div>
  )
}

export default Siderbar
