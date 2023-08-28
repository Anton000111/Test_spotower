'use client'
import styles from './Card.module.css';
import { Button } from '../Button';
import { getIp, fetchApi } from '@/helpers';

const Card = ({ id, title, description, buttonText, imageUrl, textColor, backgroundColor, reverse }) => {
  const containerClass = reverse ? styles.container + ' ' + styles.reverse : styles.container;

  const clickButton = async () => {
    const ip = await getIp();

    const body = {
      screenSize: `${window.innerWidth}/${window.innerHeight}`,
      ip,
      userAgent: window.navigator.userAgent,
      dashboardId: id,
    }

    fetchApi('/track', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  return (
    <div className={containerClass} style={{ backgroundColor, color: textColor }}>
      <img className={styles.image} src={imageUrl} alt='image' />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.description}>{description}</span>
        <Button label={buttonText} outline color={textColor} onClick={clickButton} />
      </div>
    </div>
  )
};

export default Card;
