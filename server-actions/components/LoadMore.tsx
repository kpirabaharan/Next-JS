'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { fetchAnime } from '@/app/action';
import AnimeCard, { AnimeProp } from './AnimeCard';

function LoadMore() {
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<AnimeProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoreAnime = async (page: number) => {
      if (inView && !isLoading) {
        setIsLoading(true);
        const newData = await fetchAnime(page + 1);
        setData(prev => [...prev, ...newData]);
        setPage(page + 1);
        setTimeout(() => setIsLoading(false), 500); // Add delay before setting loading state to false
      }
    };
    fetchMoreAnime(page);
  }, [inView, data, page, isLoading]);

  return (
    <>
      <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} page={page} />
        ))}
      </section>
      <section className='flex w-full items-center justify-center'>
        <div ref={ref}>
          <Image
            src='./spinner.svg'
            alt='spinner'
            width={56}
            height={56}
            className='object-contain'
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
