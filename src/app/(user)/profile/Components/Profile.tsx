'use client';

import { Section, Typography } from '../../../../components/UI/UIComponents';
import styles from './Profile.module.css';
import Image from 'next/image';
import { Telegram } from '@mui/icons-material';
import useUserProfile from '@/hooks/useUserProfile';
import FetchServiceInstance from '@/app/api';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { chartDataExtractor } from '@/utils/customUtils';
import { userAPIConstant } from '@/constants/api-endpoints.constant';

export default function ProfileComponent() {
  const { userStoredData } = useUserProfile();
  const [chart, setChart] = useState<chartData[]>([]);

  useEffect(() => {
    const fetchChart = async () => {
      const request = await FetchServiceInstance.fetchHelper(userAPIConstant['chart'], {
        to: 'self',
        method: 'GET',
        chache: 'no-store',
      });

      const chart = chartDataExtractor(request);
      setChart(chart);
    };

    fetchChart();
  }, []);

  return (
    <Section typeOfSection={'OneColSection'}>
      {userStoredData ? (
        <>
          <div className={styles.profileRowUp}>
            <div>
              {userStoredData.username && (
                <Typography variant="h1"> {userStoredData.username} </Typography>
              )}
              <h2 className="text">
                {userStoredData.first_name ? userStoredData.first_name : '...'}
              </h2>
              <h2 className="subText">
                {userStoredData.description ? userStoredData.description : '...'}
              </h2>
            </div>
            {userStoredData.avatar ? (
              <Image
                className="rounded-xl size-32 md:size-64 object-cover"
                alt="pfp"
                src={userStoredData.avatar}
                width={256}
                height={256}
              />
            ) : (
              <div className="size-32 md:size-64 bg-black rounded-xl"></div>
            )}
          </div>

          <div className={styles.profileRowDown}>
            <div>
              <Telegram sx={{ fontSize: '5rem' }} />
            </div>
            {chart.length > 0 && (
              <div className="size-64 rounded-xl">
                <PieChart
                  colors={['#fff']}
                  slotProps={{ legend: { hidden: true } }}
                  series={[
                    {
                      data: chart,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -45,
                      endAngle: 225,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <h1>Any user founded</h1>
      )}
    </Section>
  );
}
