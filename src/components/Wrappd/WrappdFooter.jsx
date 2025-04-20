const WrappdFooter = () => {
  return (
    <div className="mt-14 flex flex-row items-center text-2xl">
      <img
        crossOrigin="anonymous"
        src="/logo-wrappd.png"
        className="mr-6 w-[78px]"
        alt=""
      />
      <footer>
        <div className="font-bold">Tappd Wrappd</div>
        <div className="text-wrappdYellow">
          Create your own at{' '}
          <a
            href="https://tapped.online"
            target="_blank"
            className="hover:underline"
            rel="noreferrer"
          >
            tapped.online
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WrappdFooter;
