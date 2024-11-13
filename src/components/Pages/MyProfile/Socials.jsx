import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import SocialModal from '@/components/shared/AllModals/SocialModal';

const Socials = ({ socials }) => {

  const { facebook = '', twitter = '', instagram = '', linkedin = '' } = socials || {};

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-base font-semibold">Social Media</h1>
          <p className="text-xs">Connected</p>
        </div>
        <SocialModal />
      </div>
      {/* icons */}

      <div className="flex items-start justify-start gap-3 text-tertiary ">
        <a target='_blank' href={facebook}><FaFacebookF /></a>
        <a target='_blank' href={twitter}><FaTwitter className="text-lg" /></a>
        <a target='_blank' href={instagram}><AiFillInstagram className="text-lg" /></a>
        <a target='_blank' href={linkedin}><FaLinkedinIn className="text-lg" /></a>
        {/* <Link href={youtube}><FaYoutube className="text-xl" /></Link> */}
      </div>
    </div>
  );
};

export default Socials;
