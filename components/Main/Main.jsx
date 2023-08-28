import styles from './Main.module.css';

const Main = ({ children }) => {
  return (
    <main className={styles.container}>
      {children}
    </main>
  );
};

export default Main;
