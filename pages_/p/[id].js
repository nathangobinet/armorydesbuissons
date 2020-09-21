import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/common/navbar/Navbar';
import Footer from '../../components/common/footer/Footer';
import InformationBanner from '../../components/player/InformationBanner';
import useFetch from '../../helpers/useFetch';
import InfoCards from '../../components/player/InfoCards';

export default function Player() {
  const router = useRouter();
  const profileFetch = useFetch('/api/playerInfo', undefined, { id: router.query.id });
  const [profileInfo, setProfileInfo] = useState(undefined);

  useEffect(() => {
    setProfileInfo(profileFetch);
  }, [profileFetch]);

  return (
    <div>
      <Navbar />
      <div className="container-fluid p-4">
        <InformationBanner profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
        <InfoCards profileInfo={profileInfo} />
      </div>
      <Footer />
    </div>
  );
}
