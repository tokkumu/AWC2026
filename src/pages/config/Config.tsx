import { Dispatch, SetStateAction } from 'react';
import { ConfigData } from './types';
import ConfigProgressBar from './ConfigProgressBar';
import CourseSelect from './CourseSelect';
import { TextField, Typography } from '@mui/material';
import './Config.css';
import { Drink, Starter, Main, Side, Dessert } from '../../types';

const Config = ({
  configData,
  setConfigData,
}: {
  configData: ConfigData;
  setConfigData: Dispatch<SetStateAction<ConfigData>>;
}) => {
  const handleConfigChange = (
    name: string,
    value: boolean | string[] | string
  ) =>
    setConfigData((prev) => {
      if (name.includes('.')) {
        const [category, subcategory] = name.split('.');
        return {
          ...prev,
          [category]: {
            ...(prev[category as keyof ConfigData] as object),
            [subcategory]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });

  const calculateProgress = (configData: ConfigData) => {
    let totalTickets = 0;
    if (configData.courses.drink.enabled) totalTickets += 5;
    if (configData.courses.starter.enabled) totalTickets += 20;
    if (configData.courses.main.enabled) totalTickets += 25;
    if (configData.courses.side.enabled) totalTickets += 15;
    if (configData.courses.dessert.enabled) totalTickets += 10;
    return totalTickets;
  };

  return (
    <div className="config-container">
      <h1 className="config-header">Config</h1>
      <form className="config-field">
        <div className="input-group">
          <Typography>Username</Typography>
          <TextField
            hiddenLabel
            id="username"
            name="username"
            value={configData.username}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.username ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
            required
          />
        </div>

        <div className="input-group">
          <Typography>Completed Anime</Typography>
          <TextField
            hiddenLabel
            id="completedAnime"
            name="completedAnime"
            value={configData.completedAnime}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.completedAnime ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
            required
          />
        </div>

        <div className="input-group">
          <Typography>Time Zone</Typography>
          <TextField
            hiddenLabel
            id="timeZone"
            name="timeZone"
            value={configData.timeZone}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.timeZone ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
            required
          />
        </div>

        <div className="input-group">
          <Typography>Anime Featured In Forum Avatar/Signature</Typography>
          <TextField
            hiddenLabel
            id="animeInForum"
            name="animeInForum"
            value={configData.animeInForum}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ input: { backgroundColor: 'white' } }}
          />
        </div>

        <div className="input-group">
          <Typography>Initial Post #</Typography>
          <TextField
            hiddenLabel
            id="initialPostNumber"
            name="initialPostNumber"
            value={configData.initialPostNumber}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.timeZone ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
          />
        </div>

        <div className="input-group">
          <Typography>Plan To Watch Color</Typography>
          <TextField
            hiddenLabel
            id="legend.ptw"
            name="legend.ptw"
            value={configData.legend.ptw}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.timeZone ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
          />
        </div>

        <div className="input-group">
          <Typography>Watching Color</Typography>
          <TextField
            hiddenLabel
            id="legend.watching"
            name="legend.watching"
            value={configData.legend.watching}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.timeZone ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
          />
        </div>

        <div className="input-group">
          <Typography>Completed Color</Typography>
          <TextField
            hiddenLabel
            id="legend.completed"
            name="legend.completed"
            value={configData.legend.completed}
            onChange={(e) => handleConfigChange(e.target.name, e.target.value)}
            fullWidth
            variant="outlined"
            color={configData.timeZone ? 'primary' : 'error'}
            sx={{ input: { backgroundColor: 'white' } }}
          />
        </div>

        <div className="course-section">
          <h2>
            Courses - {calculateProgress(configData)} Total Items Selected
          </h2>

          <ConfigProgressBar progress={calculateProgress(configData)} />

          <CourseSelect
            course="drink"
            courseName="Drink"
            values={Drink}
            configData={configData}
            setConfigData={setConfigData}
          />

          <CourseSelect
            course="starter"
            courseName="Starter"
            values={Starter}
            configData={configData}
            setConfigData={setConfigData}
          />

          <CourseSelect
            course="main"
            courseName="Main Course"
            values={Main}
            configData={configData}
            setConfigData={setConfigData}
          />

          <CourseSelect
            course="side"
            courseName="Side"
            values={Side}
            configData={configData}
            setConfigData={setConfigData}
          />

          <CourseSelect
            course="dessert"
            courseName="Dessert"
            values={Dessert}
            configData={configData}
            setConfigData={setConfigData}
          />
        </div>
      </form>
    </div>
  );
};

export default Config;
