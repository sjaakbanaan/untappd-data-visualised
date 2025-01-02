import Icon from './Icon/Icon.jsx';

const NotificationBar = ({ text, show = true, type = 'alert' }) => {
  if (!show) return null; // Return null for no rendering
  return (
    <div
      className={`mb-8 flex items-center ${type == 'error' ? 'bg-red-400' : 'bg-yellow-500'} px-4 py-3 text-sm font-bold text-black`}
      role="alert"
    >
      <Icon icon="INFO" className="mr-2 size-4 fill-current" />
      <p>{text}</p>
    </div>
  );
};

export default NotificationBar;
