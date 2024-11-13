'use client';
import Products from '@/components/Pages/Home/Products/Products';
import Container from '@/components/shared/Container/Container';
import { useTrendingQuery } from '@/store/activity/activity';
const Trending = () => {
  const { data: { data: trending } = [], isLoading } = useTrendingQuery();
  return (
    <Container>
      <div>
        <h1 className="text-3xl pt-20 pl-6 font-semibold">
          Trending Activities
        </h1>
        <Products activity={trending} isLoading={isLoading} />
      </div>
    </Container>
  );
};

export default Trending;
