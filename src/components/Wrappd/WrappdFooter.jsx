const WrappdFooter = () => {
  return (
    <div className="mt-14 flex flex-row items-center">
      <img src="/logo-wrappd.svg" className="mr-6 w-[78px]" alt="" />
      <footer>
        <div className="text-xl font-bold md:text-2xl">Tappd Wrappd</div>
        <div className="text-base text-wrappdYellow md:text-2xl">
          Create your own at{' '}
          <a
            href="https://tappd.online"
            target="_blank"
            className="hover:underline"
            rel="noreferrer"
          >
            tappd.online
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WrappdFooter;
