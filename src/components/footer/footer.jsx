import styles from './footer.module.css';

function Footer() {
    return (
        <footer>
            <h2>by Thomas Roth</h2>
            <div>
                <h3>Contact Me:</h3>
                <ul>
                    <li className={styles.contactElement}>
                        <img src="/github-142-svgrepo-com.svg" alt="" className={"icon"} width={25}/>
                        <a href="https://github.com/TRed91" target={"_blank"}>
                            Github
                        </a>
                    </li>
                    <li className={styles.contactElement}>
                        <img src="/linkedin-svgrepo-com.svg" alt="" className={"icon"} width={25}/>
                        <a href="https://www.linkedin.com/in/thomas-roth-90b91531b/" target={"_blank"}>
                            Linked In
                        </a>
                    </li>
                    <li className={styles.contactElement}>
                        <img src="/mail-svgrepo-com.svg" alt="" className={"icon"} width={25}/>
                        <a href="mailto:thomas.roth@aon.at">
                            Email
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;