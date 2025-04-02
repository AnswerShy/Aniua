import styles from './LoadingComponent.module.css';

export default function LoadingFullScreen() {
  return (
    <div id="transition" className={`${styles.loadingWrapper} hidden`}>
      <div className={styles.loadingText}>ANIUA</div>
    </div>
  );
}
