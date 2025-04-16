import React from 'react';
import { CustomButton, Typography } from '../UIComponents';
import { paths } from '@/constants/headersconst';

interface TableProps {
  title?: string;
  children: React.ReactNode;
}

function Table({ title, children }: TableProps) {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">{title}</Typography>
      <div className="bg-c01dp p-4 min-w-[250px] rounded-xl">{children}</div>
    </div>
  );
}

interface RowProps {
  title: string;
  data: string | AnimeGenres[];
  url?: string;
}

const Row = ({ title, data, url }: RowProps) => {
  return (
    <div className="flex flex-row w-full items-center justify-between border-b-2 border-dashed border-c02dp">
      <span className="py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {title}:
      </span>
      <div className="flex flex-col">
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
