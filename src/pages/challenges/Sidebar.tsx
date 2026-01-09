import { Typography } from '@mui/material';
import './Sidebar.css';
import { SidebarProps } from './types';
import { CourseItem } from '../../types';

const Sidebar = (props: SidebarProps) => {
  const { courses, setCurrentCourse } = props;
  if (!Object.values(courses).some((m) => m)) {
    return (
      <div className="sidebar">
        <ul>
          <li>
            <Typography>
              No courses enabled. Enable some in the config.
            </Typography>
          </li>
        </ul>
      </div>
    );
  }
  console.log(courses);

  return (
    <div className="sidebar">
      <ul>
        {(Object.keys(courses) as CourseItem[]).map((page) => (
          <li
            key={page}
            className="sidebar-page"
            hidden={!courses[page]}
            onClick={() => setCurrentCourse(page)}
          >
            <Typography>{page}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
