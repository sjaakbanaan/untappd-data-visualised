import { useDrop } from 'react-dnd';

export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <div
      ref={drop}
      className="h-40 flex items-center justify-center mb-6"
      style={{ backgroundColor }}
      data-testid="dustbin"
    >
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};
