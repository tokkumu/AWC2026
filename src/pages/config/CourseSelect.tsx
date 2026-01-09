import {
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ConfigData } from './types';
import { Dispatch, SetStateAction } from 'react';
import { COURSE_DATA } from '../challenges/data/data';
import { Drink, Starter, Main, Side, Dessert } from '../../types';

const CourseSelect = ({
  course,
  courseName,
  values,
  configData,
  setConfigData,
}: {
  course: keyof ConfigData['courses'];
  courseName: string;
  values:
    | typeof Drink
    | typeof Starter
    | typeof Main
    | typeof Side
    | typeof Dessert;
  configData: ConfigData;
  setConfigData: Dispatch<SetStateAction<ConfigData>>;
}) => {
  const handleCourseChange = (
    name: string,
    value: boolean | string[] | string
  ) =>
    setConfigData((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        [course]: {
          ...prev.courses[course],
          [name]: value,
        },
      },
    }));

  const handleValidatorChange = (name: string, value: string) => {
    setConfigData((prev) => ({
      ...prev,
      courseValidatorInfo: {
        ...prev.courseValidatorInfo,
        [getCourseItem(course)]: {
          ...prev.courseValidatorInfo[getCourseItem(course)],
          [name]: value,
        },
      },
    }));
  };

  const getCourseItem = (course: keyof ConfigData['courses']) =>
    configData.courses[course].value;

  return (
    <div className="course-box">
      <FormControlLabel
        control={
          <Checkbox
            checked={configData.courses[course].enabled}
            onChange={(e) =>
              handleCourseChange(e.target.name, e.target.checked)
            }
            name="enabled"
          />
        }
        label={`${courseName} (${COURSE_DATA[configData.courses[course].value].requiredChallenges} Items)`}
      />
      {configData.courses[course].enabled && (
        <Grid container className="options-dropdown">
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography>Select {courseName}</Typography>
            <Select
              name="value"
              value={configData.courses[course].value}
              fullWidth
              onChange={(e) =>
                handleCourseChange(e.target.name, e.target.value)
              }
              sx={{ maxWidth: '50%', backgroundColor: 'white' }}
            >
              {Object.values(values).map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {COURSE_DATA[getCourseItem(course)].courseValidatorInfo?.map(
            (info) => (
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography>{info.name}</Typography>
                {info.type === 'text' ? (
                  <TextField
                    fullWidth
                    name={info.name}
                    value={
                      configData.courseValidatorInfo[getCourseItem(course)][
                        info.name
                      ]
                    }
                    onChange={(e) =>
                      handleValidatorChange(e.target.name, e.target.value)
                    }
                    sx={{ width: '50%', backgroundColor: 'white' }}
                  />
                ) : (
                  <Select
                    fullWidth
                    name={info.name}
                    value={
                      configData.courseValidatorInfo[getCourseItem(course)][
                        info.name
                      ]
                    }
                    onChange={(e) =>
                      handleValidatorChange(e.target.name, e.target.value)
                    }
                    sx={{ width: '50%', backgroundColor: 'white' }}
                  >
                    {info.values?.map((v) => (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Grid>
            )
          )}
        </Grid>
      )}
    </div>
  );
};

export default CourseSelect;
