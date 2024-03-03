import WorldMap from 'react-svg-worldmap';

const VenueMap = () => {
  const data = [
    { country: 'cn', value: 40 }, // china
    { country: 'in', value: 33 }, // india
    { country: 'us', value: 12 }, // united states
    { country: 'id', value: 90 }, // indonesia
    { country: 'pk', value: 20 }, // pakistan
    { country: 'br', value: 66 }, // brazil
    { country: 'ng', value: 23 }, // nigeria
    { country: 'bd', value: 44 }, // bangladesh
    { country: 'ru', value: 15 }, // russia
    { country: 'mx', value: 52 }, // mexico
  ];

  // const stylingFunction = (context) => {
  //   return {
  //     fill: context.color,
  //   };
  // };

  return (
    <div className="p-4 bg-red-600">
      <WorldMap
        richInteraction={true}
        backgroundColor="none"
        borderColor={'white'}
        color={'#eab308'}
        tooltipBgColor={'#31323f'}
        valueSuffix="times"
        valuePrefix=":"
        size="responsive"
        data={data}
      />
    </div>
  );
};

export default VenueMap;
