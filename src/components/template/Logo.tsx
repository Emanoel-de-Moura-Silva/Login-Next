import Image from 'next/image';
import BNBLogo from '../../../public/images.png';

export default function Logo() {
  return (
    <div className={`h-10 w-10 rounded-full flex flex-col`}>
      <Image src={BNBLogo} alt="BNB logo" width={50} height={50} className='rounded-lg' />
    </div>
  );
}