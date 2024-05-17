
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/users/create">Create User</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/posts/create">Create post</Link></li>

        <li><Link to="/comments">Comments</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
