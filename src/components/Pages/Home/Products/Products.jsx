'use client';

import ProductCard from '@/components/shared/Card/ProductCard';
import Container from '@/components/shared/Container/Container';

import ProductSkeleton from '@/components/shared/Skeleton/ProductSkeleton';

const Products = ({ activity, isLoading }) => {
  // const query = 'searchTerm&minBudget&maxBudget&activityType&time&for&totalPeopleCanJoin&ageGroup';

  if (isLoading) {
    return (
      <Container>
        <div className="grid grid-cols-1 gap-10 mb-10 md:my-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item, _id) => (
            <ProductSkeleton key={_id} />
          ))}
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="grid grid-cols-1 gap-5 mb-10 md:my-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
        {activity?.map((item, _id) => (
          <ProductCard item={item} key={_id} />
        ))}
      </div>
    </Container>
  );
};

export default Products;
