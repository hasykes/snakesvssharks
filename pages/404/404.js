import styles from './404.module.css'
import Image from 'next/image';

export default function Custom404() {
    return <>
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <div className={styles.imageContainer}>
            <Image src="/images/snakesvssharkslogo.png" alt="snake and a shark fighting to the death" width={250} height={250}/>
        </div>
    </>
}