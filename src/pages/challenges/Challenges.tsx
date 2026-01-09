import { useState } from 'react';
import { getEnabledCourses as getEnabledCourses } from './data/data';
import Sidebar from './Sidebar';
import { ChallengesProps } from './types';
import Course from './Course';
import './Challenges.css';
import { CourseItem } from '../../types';

function Challenges(props: ChallengesProps) {
  const [currentCourse, setCurrentCourse] = useState<CourseItem>(
    '' as CourseItem
  );

  return (
    <div className="App">
      <div className="container">
        <Sidebar
          courses={getEnabledCourses(props.config.courses)}
          setCurrentCourse={setCurrentCourse}
        />
        <div className="separator"></div>
        <Course currentCourse={currentCourse} {...props} />
      </div>
    </div>
  );
}

export default Challenges;
