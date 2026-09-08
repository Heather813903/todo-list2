import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <p>
        <Link to="/">Go Home</Link>
      </p>

      <p>
        <Link to="/todos">Go to Todos</Link>
      </p>

      <p>
        <Link to="/about">Go to About</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
