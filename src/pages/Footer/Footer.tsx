import styles from "./Footer.module.css";

import Copyright from "../../assets/Copyright.svg?react";

function Footer () {
    return (
        <footer className={styles.footer}>
            <div className={styles.description_box}>
                <h1 className={styles.title}>inPDFile - ваш помощник в работе с документами</h1>
                <p className={styles.description}>В современном мире обработка документов требует скорости и точности. inPDFile помогает автоматически определять тип PDF-файлов, экономя ваше время и снижая вероятность ошибок. Будь то чеки, договоры, соглашения или другие документы - наш сервис обеспечит вам мгновенный результат.</p>
            </div>
            <div className={styles.description_box}>
                <p className={styles.description}>Если у вас есть вопросы или предложения, свяжитесь с нами:</p>
                <ul className={styles.contacts_list}>
                    <li className={styles.contact}>
                        <p className={styles.description}><strong>Email:</strong> support@inpdfile.com</p>
                    </li>
                    <li className={styles.contact}>
                        <p className={styles.description}><strong>Telegram:</strong> @Darkems</p>
                    </li>
                    <li className={styles.contact}>
                        <p className={styles.description}><strong>VK:</strong> Пока что нет</p>
                    </li>
                </ul>
                <p className={`${styles.description} ${styles.copyright_box}`}>2025 inPDFile. Все права защищены <Copyright className={styles.copyright}/></p>
            </div>
        </footer>
    )
}

export default Footer;