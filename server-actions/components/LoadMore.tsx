import Image from 'next/image';

function LoadMore() {
  return (
    <>
      <section className='flex w-full items-center justify-center'>
        <div>
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
