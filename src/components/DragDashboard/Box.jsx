import { useDrag } from 'react-dnd';

export const Box = function Box({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.5 : 1;
  return (
    <div
      ref={drag}
      className="border-dashed border border-white px-4 py-2 mr-6 cursor-move"
      style={{ opacity }}
      data-testid="box"
    >
      {name}
    </div>
  );
};
