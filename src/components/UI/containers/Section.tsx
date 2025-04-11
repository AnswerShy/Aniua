import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  typeOfSection?: 'grid' | 'flex' | 'flexThreeCols' | 'Banner' | 'Profile' | 'center';
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, typeOfSection = 'flex', id, ...props }) => {
  const widthClasses: { [key: string]: string } = {
    grid: styles.gridSectionStyle,
    flex: styles.flexSectionStyle,
    flexThreeCols: styles.flexThreeColsSectionStyle,
    Banner: styles.bannerSectionStyle,
    Profile: styles.profileSectionStyle,
    center: styles.centerSectionStyle,
  };
  return (
    <section className={widthClasses[typeOfSection]} id={id} {...props}>
      {children}
    </section>
  );
};

export default Section;
