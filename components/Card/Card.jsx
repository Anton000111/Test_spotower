'use client'
import styles from './Card.module.css';
import { Button } from '../Button';

const Card = ({ id, title, description, buttonText, imageUrl, textColor, backgroundColor, reverse }) => {
  const containerClass = reverse ? styles.container + ' ' + styles.reverse : styles.container;

  return (
    <div className={containerClass} style={{ backgroundColor, color: textColor }}>
      <img className={styles.image} src={imageUrl} alt='image' />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.description}>{description}</span>
        <Button label={buttonText} outline color={textColor} />
      </div>
    </div>
  )
};

export default Card;
