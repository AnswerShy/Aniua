import React from 'react';
import { CustomButton, Typography } from '../UIComponents';
import { paths } from '@/constants/headersconst';
import styles from './Table.module.css';

interface TableProps {
  title?: string;
  children: React.ReactNode;
}

function Table({ title, children }: TableProps) {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">{title}</Typography>
      <div className={styles.table}>{children}</div>
    </div>
  );
}

interface RowProps {
  title: string;
  data: string | AnimeGenres[];
  url?: string;
}

const Row = ({ title, data, url }: RowProps) => {
  if (!data) return;
  return (
    <div className={styles.tableRow}>
      <span className="">{title}:</span>
      <div className={styles.tableRowRight}>
        {typeof data !== 'string' ? (
          Object.entries(data).map((element, key) => {
            return (
              <CustomButton
                variant="link"
                key={key}
                url={`${paths.list}/?genres=${element[1].slug}`}
              >
                {element[1].title}
              </CustomButton>
            );
          })
        ) : (
          <CustomButton variant="link" url={url}>
            {data}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

Table.row = Row;

export default Table;
