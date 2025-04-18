import { Typography } from '../UIComponents';
import styles from './Section.module.css';

const SectionType = {
  OneColSection: styles.OneColSection,
  TwoColSection: styles.TwoColSection,
  ThreeColsSection: styles.ThreeColsSection,
  BannerSection: styles.BannerSection,
  grid: styles.grid,
};

type SectionProps = {
  children: React.ReactNode;
  typeOfSection?: keyof typeof SectionType;
  id?: string;
};

const SectionBase: React.FC<SectionProps> = ({ children, typeOfSection = 'OneColSection', id }) => {
  return (
    <section className={SectionType[typeOfSection]} id={id}>
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

const widthClasses: { [key: string]: string } = {
  '10': '10%',
  '13': '13%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '4/4': '100%',
};

type ColProps = {
  children: React.ReactNode;
  title?: string;
  widthState?: keyof typeof widthClasses;
};

const Col: React.FC<ColProps> = ({ children, title, widthState = '1' }) => {
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
