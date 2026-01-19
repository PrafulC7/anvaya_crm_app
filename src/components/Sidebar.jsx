import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
<NavLink to="/">
          <h2 className="logo">Anvaya App</h2>
        </NavLink>
      <nav>
        <NavLink to="/" end className="link">
          Dashboard
        </NavLink>

        <NavLink to="/leads" className="link">
          Leads
        </NavLink>

        <NavLink to="/agents" className="link">
          Sales Agents
        </NavLink>

         <NavLink to="/reports" className="link">
          Reports
        </NavLink>

        <NavLink to="/settings" className="link">Settings</NavLink>
      </nav>
        {/* <nav className="nav flex-column">
  <a className="nav-link active" aria-current="page" href="#">Active</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
</nav> */}
         </div>
  )
}

export default Sidebar