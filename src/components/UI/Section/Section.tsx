import { Typography } from '../UIComponents';
import styles from './Section.module.css';

type SectionProps = {
  children: React.ReactNode;
  typeOfSection?: 'OneColSection' | 'ThreeColsSection' | 'BannerSection' | 'grid';
  id?: string;
};

const SectionBase: React.FC<SectionProps> = ({ children, typeOfSection = 'OneColSection', id }) => {
  const widthClasses: { [key: string]: string } = {
    OneColSection: styles.OneColSection,
    ThreeColsSection: styles.ThreeColsSection,
    BannerSection: styles.BannerSection,
    grid: styles.grid,
  };
  return (
    <section className={widthClasses[typeOfSection]} id={id}>
      {children}
    </section>
  );
};

type RowProps = {
  children: React.ReactNode;
};

const Row: React.FC<RowProps> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

type ColProps = {
  children: React.ReactNode;
  title?: string;
  widthState?: '1/4' | '2/4' | '3/4' | '1';
};

const Col: React.FC<ColProps> = ({ children, title, widthState = '1' }) => {
  const widthClasses: { [key: string]: string } = {
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '4/4': '100%',
  };
  return (
    <>
      <div
        style={{ width: widthClasses[widthState] } as React.CSSProperties}
        className={styles.col}
      >
        <Typography variant="h2">{title}</Typography>
        {children}
      </div>
    </>
  );
};

const Section = Object.assign(SectionBase, { Row, Col });
export default Section;
