import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
// components
import Overview from './Overview/Overview.jsx';

const ChartModal = ({ beerList, open, setOpen }) => {
  const closeModal = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={closeModal}
      center
      classNames={{
        modal: 'customModal',
      }}
    >
      <Overview title="Filtered Beers overview" lessCols beerData={beerList} />
    </Modal>
  );
};

export default ChartModal;
