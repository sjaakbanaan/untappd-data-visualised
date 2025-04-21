import PropTypes from 'prop-types';

const WrappdPhotos = ({ photosList }) => {
  // return null if there are less than 5 photos
  if (photosList.items.filter((item) => item.photo_url).length < 5) return null;
  return (
    <div className="mb-10 grid grid-flow-row grid-cols-2 grid-rows-2 gap-4 md:mt-14 md:grid-cols-12">
      {photosList.items
        .filter((item) => item.photo_url)
        .slice(0, 5)
        .map((item, index) => {
          // get the original index of the photo to display in the top right corner
          const originalIndex = photosList.items.findIndex((beer) => beer === item);
          return (
            <div
              key={index}
              style={{
                backgroundImage: `url(${item.photo_url})`,
              }}
              className={`relative col-span-1 flex justify-center overflow-hidden rounded-lg bg-wrappdYellow bg-cover bg-center lg:rounded-3xl ${
                index >= 2 ? 'aspect-square md:col-span-4' : 'md:col-span-6'
              }`}
            >
              <div className="absolute right-3 top-3 aspect-square w-8 rounded-full bg-wrappdYellow text-center text-xl font-bold leading-7 text-black">
                {originalIndex + 1}
              </div>
            </div>
          );
        })}
    </div>
  );
};

WrappdPhotos.propTypes = {
  photosList: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        photo_url: PropTypes.string,
      })
    ),
  }),
};

export default WrappdPhotos;
