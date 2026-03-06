import { version } from '../../package.json';

const Footer = () => {
  return (
    <div className="my-5 p-3 text-center text-yellow-500 md:my-10">
      Created by{' '}
      <a href="https://github.com/sjaakbanaan/" target="_blank" rel="noreferrer">
        sjaakbanaan
      </a>
      <div className="pt-1 text-gray-400">v{version}, powered by Untappd</div>
    </div>
  );
};
export default Footer;
