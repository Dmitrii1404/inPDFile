import styles from './Navigation.module.css';
import { Link } from "react-router-dom";


export interface NavLink {
    link: string;
    pageName: string;
}

interface NavigationProps {
    links: NavLink[];
}

function Navigation ({ links }: NavigationProps) {
    return (
        <nav className={styles.navigation}>
            <ul className={styles.nav__list}>
                {links.map(({ link, pageName }) => (
                    <li className={styles.nav__item}>
                        <Link to={link} className={styles.link}>{pageName}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )

}

export default Navigation;