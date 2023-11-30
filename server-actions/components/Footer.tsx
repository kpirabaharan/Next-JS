import Image from 'next/image';

function Footer() {
  return (
    <footer className='flex flex-wrap items-center justify-between gap-2 bg-[#161921] px-8 py-4 sm:px-16'>
      <p className='text-base font-bold text-white'>@2023 EpicAnimeVault</p>
      <Image
        src='./logo.svg'
        alt='logo'
        width={47}
        height={44}
        className='object-contain'
      />
      <div className='flex items-center gap-6'>
        <Image
          src='./tiktok.svg'
          alt='logo'
          width={19}
          height={19}
          className='object-contain'
        />
        <Image
          src='./instagram.svg'
          alt='logo'
          width={19}
          height={19}
          className='object-contain'
        />
        <Image
          src='./twitter.svg'
          alt='logo'
          width={19}
          height={19}
          className='object-contain'
        />
      </div>
    </footer>
  );
}

export default Footer;
