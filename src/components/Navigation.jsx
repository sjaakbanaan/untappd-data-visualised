import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="mr-3">
      <ul className="text-xs">
        {pathname == '/import' ? (
          <li>
            <Link to="/">Home</Link>
          </li>
        ) : (
          <li>
            <Link to="/import">Import data</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
