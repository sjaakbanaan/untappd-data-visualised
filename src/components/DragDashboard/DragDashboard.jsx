import Container from './Container.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragDashboard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  );
};

export default DragDashboard;
