import PropTypes from 'prop-types';

/**
 * Wraps a section in the stacking card shell.
 * --index and --numcards CSS custom props drive the sticky offset and scale animation.
 * Fade in/out is handled via CSS animation-timeline: view() in index.css.
 */
const StackCard = ({
  index,
  numCards,
  bg = 'bg-gray-900',
  extraClass = '',
  children,
}) => (
  <li
    className={`wrappd-card sticky ${extraClass}`}
    style={{ '--index': index, '--numcards': numCards }}
  >
    <div
      className={`wrappd-card__content min-h-[75vh] origin-top overflow-hidden rounded-3xl shadow-2xl shadow-gray-950 will-change-transform ${bg}`}
    >
      {children}
    </div>
  </li>
);

StackCard.propTypes = {
  index: PropTypes.number.isRequired,
  numCards: PropTypes.number.isRequired,
  bg: PropTypes.string,
  extraClass: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default StackCard;
