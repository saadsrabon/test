'use client';
import Products from '@/components/Pages/Home/Products/Products';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';
import { getAccessToken } from '@/lib/auth/token';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
const MyFavorites = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetData = async () => {
      setLoading(true);
      try {
        const cookieValue = Cookies.get('name');
        if (cookieValue) {
          const data = JSON.parse(cookieValue);
          const token = getAccessToken(); // Replace this with your method of getting the token
          console.log(token, data);

          const result = await axios.get(
            `https://api.elplanes.com/api/v1/favorite/${data._id}`,
            {
              headers: {
                authorization: token, // Add the token to the Authorization header
              },
            }
          );

          setActivity(result.data.data);
          console.log(result.data.data);
        } else {
          console.log('Cookie not found');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    GetData();
  }, []);
  const getJustActivity = (data) => {
    if (data?.length <= 0 || !data) {
      return [];
    } else {
      const newData = [...data].map((item) => item.activity);
      return newData;
    }
  };
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <div>
        <h1 className="text-3xl pt-20 pl-6 font-semibold">My Favorites</h1>
        <Products activity={getJustActivity(activity)} isLoading={loading} />
      </div>
      </Container>
    </ProtectedPage>
  );
};

export default MyFavorites;
