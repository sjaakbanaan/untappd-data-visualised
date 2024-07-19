import Icon from './Icon/Icon.jsx';

const Header = ({ text }) => (
  <div
    className="mb-8 flex items-center bg-yellow-500 px-4 py-3 text-sm font-bold text-black"
    role="alert"
  >
    <Icon icon="INFO" className="mr-2 size-4 fill-current" />
    <p>{text}</p>
  </div>
);
export default Header;
