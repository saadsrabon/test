'use client';
import ProductCard from '@/components/shared/Card/ProductCard';
import Container from '@/components/shared/Container/Container';
import { useActivityQuery } from '@/store/activity/activity';

const RelatedActivities = () => {
  const { data: activity } = useActivityQuery();
  console.log(activity);
  return (
    <Container>
      <div className="space-y-10">
        <h1 className="text-xl font-semibold">Related Activities</h1>
        <div className="grid grid-cols-1 gap-10 my-16 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
          {activity?.data.map((item, _id) => (
            <ProductCard item={item} key={_id} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center my-20">
        <button className="px-8 py-2 text-sm text-white rounded-sm bg-tertiary">
          Load More
        </button>
      </div>
    </Container>
  );
};

export default RelatedActivities;
