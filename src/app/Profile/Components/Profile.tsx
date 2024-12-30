'use client';

import { Section, Typography } from '../../../components/Shared/SharedComponents';
import styles from './Profile.module.css';
import Image from 'next/image';
import { Telegram } from '@mui/icons-material';
import useUserProfile from '@/hooks/useUserProfile';
import AnimeServiceInstance from '@/app/api';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ProfileComponent() {
  const userData = useUserProfile();
  const [chart, setChart] = useState<chartData[]>([]);

  useEffect(() => {
    AnimeServiceInstance.fetchUserListContent().then((data) => setChart(data));
  }, []);

  return (
    <Section typeOfSection={'Profile'}>
      {userData ? (
        <>
          <div className={styles.profileRowUp}>
            <div>
              {userData.username && <Typography variant="h1"> {userData.username} </Typography>}
              <h2 className="text">{userData.first_name ? userData.first_name : '...'}</h2>
              <h2 className="subText">{userData.description ? userData.description : '...'}</h2>
            </div>
            {userData.avatar ? (
              <Image
                className="rounded-xl size-32 md:size-64 object-cover"
                alt="pfp"
                src={userData.avatar}
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
          </div>
        </>
      ) : (
        <h1>Any user founded</h1>
      )}
    </Section>
  );
}
