import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="mr-3">
      <ul className="text-xs">
        {pathname == '/upload' ? (
          <li>
            <Link to="/">Dashboard</Link>
          </li>
        ) : (
          <li>
            <Link to="/upload">Import data</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
