const WrappdPhotos = ({ topList }) => {
  return (
    <div className="mb-10 mt-14 grid grid-flow-row grid-cols-12 grid-rows-2 gap-4">
      {topList?.items.map((item, index) => {
        // Dynamically set col-span based on index
        const colSpan = index >= 2 ? 4 : 6;

        return (
          <div
            key={index}
            style={
              item.photo_url
                ? {
                    backgroundImage: `url(${item.photo_url})`, // Added closing parenthesis
                  }
                : undefined
            }
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className={`col-span-${colSpan} flex h-52 justify-center overflow-hidden rounded-lg bg-wrappdYellow bg-cover bg-center`}
          ></div>
        );
      })}
    </div>
  );
};

export default WrappdPhotos;
