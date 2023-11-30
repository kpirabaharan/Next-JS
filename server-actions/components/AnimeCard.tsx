import Image from 'next/image';

export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}

interface Prop {
  anime: AnimeProp;
  index: number;
}

function AnimeCard({ anime }: Prop) {
  return (
    <div className='relative w-full max-w-sm rounded'>
      <div className='relative h-[37vh] w-full'>
        <Image
          src={anime.image.original}
          alt={anime.name}
          fill
          className='rounded-xl'
        />
      </div>
      <div className='flex flex-col gap-3 py-4'>
        <div className='flex items-center justify-between gap-1'>
          <h2 className='line-clamp-1 w-full text-xl font-bold text-white'>
            {anime.name}
          </h2>
          <div className='rounded-sm bg-[#161921] px-2 py-1'>
            <p className='text-sm font-bold capitalize text-white'>
              {anime.kind}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex flex-row items-center gap-2'>
            <Image
              src='./episodes.svg'
              alt='episodes'
              width={20}
              height={20}
              className='object-contain'
            />
            <p className='text-base font-bold text-white'>
              {anime.episodes || anime.episodes_aired}
            </p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <Image
              src='./star.svg'
              alt='star'
              width={18}
              height={18}
              className='object-contain'
            />
            <p className='text-base font-bold text-[#FFAD49]'>{anime.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
