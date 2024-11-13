"use client"
import ProductCard from '@/components/shared/Card/ProductCard';
import React from 'react';
import product from '@/assets/home/Product/Product.png'
import Container from '@/components/shared/Container/Container';
import { useActivityQuery } from '@/store/activity/activity';
const RunningActivities = () => {
    const ProductData = {
        image : product,
        title:'Yoga Session with Ryan',
        date:'2024-06-05T00:00:00.000Z',
        rating:4.91,
        reviews:484,
        duration:2.5,
        price:250
      
    }
    const {data : activity } = useActivityQuery()
    return (
        <Container>
        <div className='grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 my-16'>
        {activity?.data.map((item, _id) => (
            <ProductCard item={item} key={_id} />
          ))}
        </div>
        </Container>
    );
};

export default RunningActivities;