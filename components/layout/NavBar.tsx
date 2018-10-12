import * as React from "react"
import Link from "next/link"

export interface NavBarProps {}

export interface NavBarState {}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  private links: { name: string; href: string }[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ]

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4 py-2">
        <a className="navbar-brand" href="#">
          Arquitrán
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.links.map(({ name, href }) => (
              <li className={"nav-item"} key={name}>
                <Link href={href}>
                  <a className="nav-link">{name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    )
  }
}

export default NavBar
