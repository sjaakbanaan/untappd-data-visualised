import Icon from './Icon/Icon';

const NotificationBar = ({ text, title, show = true, type = 'alert' }) => {
  if (!show) return null;

  const typeClasses =
    type === 'error'
      ? 'border-red-500/20 bg-red-500/5'
      : 'border-yellow-500/20 bg-yellow-500/5';
  const iconColor = type === 'error' ? 'text-red-500' : 'text-yellow-500';

  return (
    <div
      className={`mb-8 flex items-start gap-4 rounded-lg border ${typeClasses} p-4`}
      role="alert"
    >
      <Icon
        icon="EXCLAMATION"
        className={`mt-0.5 size-4 shrink-0 fill-current ${iconColor}`}
      />
      <div className="flex-1">
        {title && <h3 className={`mb-1 font-bold ${iconColor}`}>{title}</h3>}
        <div className="text-sm text-gray-400">{text}</div>
      </div>
    </div>
  );
};

export default NotificationBar;
