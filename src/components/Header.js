import Link from "next/link"
import styles from "@/styles/Header.module.css"
import Search from "./Search"
import { FaSignInAlt } from "react-icons/fa"
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          DJ Events
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              Events
            </Link>
          </li>
          <li>
            <Link href='/events/add'>
              Add Event
            </Link>
          </li>
          <li>
            <Link href='/account/login' className="btn-secondary btn-icon">
              <FaSignInAlt /> Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header