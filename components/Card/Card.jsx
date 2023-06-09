import styles from './Card.module.css';

export const Card = ({ imageUrl, title, alt, onClick }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <img src={imageUrl} alt={alt} className={styles.cardImage}  />
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
            </div>
        </div>
    );
};