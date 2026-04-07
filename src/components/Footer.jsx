import Icon from './UI/Icon/Icon';
import { version } from '../../package.json';

const Footer = () => {
  return (
    <div className="my-5 p-3 text-center text-yellow-500 md:my-10">
      <div className="flex items-center justify-center gap-2 pt-1 text-gray-400">
        <span>v{version}, powered by your drinking habits</span>
        <Icon
          icon="BEER"
          className="-mt-1 w-4 fill-yellow-500 transition-transform duration-300 hover:scale-125"
        />
      </div>
    </div>
  );
};
export default Footer;
