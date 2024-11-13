'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import emblaCarouselAutoplay from 'embla-carousel-autoplay';

import { cn } from '@/lib/utils';

export function ProductCardSlider({
  data,
  autoplay = true,
  button,
  rows,
  Component,
}) {
  return (
    <>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={
          autoplay
            ? [
                emblaCarouselAutoplay({
                  delay: 4000,
                }),
              ]
            : []
        }
        className="w-full mx-auto my-10"
        // className="w-8/12 sm:w-9/12 md:w-10/12 lg:w-[90%] xl:w-11/12 max-w-[1270px] mx-auto my-10"
      >
        <CarouselContent>
          {data?.map((detail, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/4 w-[292px]"
            >
              {rows ? (
                <div>
                  <div className="hidden md:flex justify-center p-1 sm:p-0 w-[292px] mb-5">
                    <Component item={detail} />
                  </div>
                  <div className="flex justify-center p-1 sm:p-0 w-[292px]">
                    <Component item={detail} />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-1 sm:p-0 w-[292px]">
                  <Component item={detail} />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            'absolute left-0 xl:-left-4 opacity-40 hover:opacity-100',
            { 'md:-top-8 md:right-10 md:left-auto xl:left-auto': rows }
          )}
        />
        <CarouselNext
          className={cn(
            'absolute right-0 xl:-right-4 opacity-40 hover:opacity-100',
            { 'md:-top-8 md:right-0 xl:right-0 md:left-auto': rows }
          )}
        />
      </Carousel>
    </>
  );
}
