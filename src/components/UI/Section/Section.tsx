import clsx from 'clsx';
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
  classname?: string;
};

const SectionBase: React.FC<SectionProps> = ({
  children,
  typeOfSection = 'OneColSection',
  id,
  classname,
}) => {
  return (
    <section className={clsx(SectionType[typeOfSection], classname)} id={id}>
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

const widthClasses: Record<string, string> = {
  '1/5': 'lg:w-1/5',
  '1/4': 'lg:w-1/4',
  '2/4': 'lg:w-2/4',
  '3/4': 'lg:w-3/4',
  '1': 'w-full',
};

type ColProps = {
  children: React.ReactNode;
  title?: string;
  widthState?: keyof typeof widthClasses;
  className?: string;
};

const Col: React.FC<ColProps> = ({ children, title, widthState = '1', className }) => {
  return (
    <>
      <div className={clsx(widthClasses[widthState], styles.col, className)}>
        {title && <Typography variant="h2">{title}</Typography>}
        {children}
      </div>
    </>
  );
};

const Section = Object.assign(SectionBase, { Row, Col });
export default Section;
