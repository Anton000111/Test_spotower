import styles from './page.module.css'
import { Card } from '@/components';
import { getDashboards } from '@/helpers';

export default async function Home() {
  const dashboards = await getDashboards();

  return (
    <div className={styles.container}>
      {dashboards.map(({ id, title, description, buttonText, imageUrl, textColor, backgroundColor }, index) => {
        return (
          <Card
            key={id}
            id={id}
            title={title}
            description={description}
            buttonText={buttonText}
            imageUrl={imageUrl}
            textColor={textColor}
            backgroundColor={backgroundColor}
            reverse={index%2 !== 0}
          />
        )
      })}
    </div>
  )
}
