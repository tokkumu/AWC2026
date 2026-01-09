import {
  Typography,
  Box,
  TextField,
  Button,
  Tooltip,
  styled,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ChallengeData, ChallengeEntry, CourseProps, ExtraInfo } from './types';
import { CHALLENGE_LIST, COURSE_DATA } from './data/data';
import { validateAnime } from './data/validators';
import { Fragment, useState } from 'react';
import './Course.css';
import { AnimeDetails } from '../../types';
import { Settings } from '@mui/icons-material';
import EditAnimeModal from './EditAnimeModal';
import { loadAnime } from '../../utils';
import EditExtraInfoModal from './EditExtraInfoModal';
import EditManualValidatorsModal from './EditManualValidatorsModal';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const Course = (props: CourseProps) => {
  const [openModals, setOpenModals] = useState<{
    [challengeId: string]: {
      anime: boolean;
      extraInfo: boolean;
      manualValidators: boolean;
    };
  }>({});

  if (!props.currentCourse) {
    return (
      <div className="main-content">
        <h1>Choose a Course</h1>
      </div>
    );
  }

  const handleChange = (challengeId: string, key: string, value: string) => {
    props.setChallengeData((challengeData) => {
      const newData: ChallengeData = {
        ...challengeData,
        [challengeId]: {
          ...challengeData[challengeId],
          [key]: value,
        },
      };

      if (key === 'malId') {
        newData[challengeId].animeData = undefined;
        newData[challengeId].extraInfo = newData[challengeId].extraInfo.map(
          (i) => ({
            ...i,
            value: '',
          })
        );
        newData[challengeId].manualValidators = Object.fromEntries(
          Object.entries(newData[challengeId].manualValidators).map((v) => [
            v[0],
            { ...v[1], valid: false },
          ])
        );
      }

      return newData;
    });
  };

  const extraInfoModalOnSave = (
    challengeId: string,
    extraInfo: ExtraInfo[]
  ) => {
    props.setChallengeData((challengeData) => ({
      ...challengeData,
      [challengeId]: {
        ...challengeData[challengeId],
        extraInfo,
      },
    }));
  };

  const infoModalOnSave = (challengeId: string, animeData: AnimeDetails) => {
    props.setChallengeData((challengeData) => ({
      ...challengeData,
      [challengeId]: {
        ...challengeData[challengeId],
        animeData,
      },
    }));
  };

  const manualValidatorsOnSave = (
    challengeId: string,
    manualValidators: ChallengeEntry['manualValidators']
  ) => {
    props.setChallengeData((challengeData) => ({
      ...challengeData,
      [challengeId]: {
        ...challengeData[challengeId],
        manualValidators,
      },
    }));
  };

  const setModalState = (challengeId: string, modal: string, open: boolean) =>
    setOpenModals((o) => ({
      ...o,
      [challengeId]: { ...o[challengeId], [modal]: open },
    }));

  const getChallenge = (challengeId: string) =>
    props.challengeData[challengeId];
  const getAnime = (challengeId: string) => getChallenge(challengeId).animeData;
  const getExtraInfo = (challengeId: string, requiredOnly: boolean = false) =>
    getChallenge(challengeId)
      .extraInfo.filter(
        (v) => !v.courses || v.courses.includes(props.currentCourse)
      )
      .filter((v) => (requiredOnly ? v.required : true));
  const getManualValidators = (challengeId: string) =>
    Object.fromEntries(
      Object.entries(getChallenge(challengeId).manualValidators).filter(
        (v) => !v[1].courses || v[1].courses.includes(props.currentCourse)
      )
    );

  const getCurrentCourse = () => {
    return Object.entries(CHALLENGE_LIST).filter(([_id, c]) =>
      c.courses.includes(props.currentCourse)
    );
  };

  const onLoadAnime = async (malId: string, challengeId: string) => {
    const updatedEntry = await loadAnime(malId);

    props.setChallengeData((challengeData) => ({
      ...challengeData,
      [challengeId]: {
        ...challengeData[challengeId],
        animeData: updatedEntry,
      },
    }));
  };

  return (
    <div className="main-content">
      <Typography variant="h4" color="common.white">
        {props.currentCourse}
      </Typography>
      <Typography variant="h6" color="common.white">
        Complete {COURSE_DATA[props.currentCourse].requiredChallenges}/
        {getCurrentCourse().length} challenges
      </Typography>
      {getCurrentCourse().map(([challengeId, c]) => (
        <Box
          key={challengeId}
          sx={{
            border: '1px solid #ddd',
            padding: '16px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: '#333',
          }}
        >
          <Typography
            key={`${challengeId}-description`}
            variant="h6"
            color="common.white"
            dangerouslySetInnerHTML={{ __html: c.description }}
          />

          {c.addlInfo.map((info, index) => (
            <Typography
              key={`${challengeId}-addlInfo-${index}`}
              sx={{ marginLeft: '16px', color: '#DDD' }}
              dangerouslySetInnerHTML={{ __html: info }}
            />
          ))}

          <Typography
            key={`${challengeId}-anime-title`}
            variant="h6"
            color="common.white"
            sx={{ marginTop: '16px' }}
          >
            <a
              href={`https://myanimelist.net/anime/${getAnime(challengeId)?.malId}`}
            >
              {getAnime(challengeId)?.title}
            </a>
          </Typography>

          <Grid
            container
            key={`${challengeId}-grid`}
            spacing={2}
            sx={{ marginTop: '16px' }}
          >
            <Grid key={`${challengeId}-malId`} size={{ xs: 12, sm: 4 }}>
              <Typography key={`${challengeId}-malId-label`}>MAL Id</Typography>
              <TextField
                key={`${challengeId}-malId-input`}
                hiddenLabel
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#FFF' }}
                value={getChallenge(challengeId).malId}
                onChange={(e) =>
                  handleChange(challengeId, 'malId', e.target.value)
                }
              />
            </Grid>
            <Grid key={`${challengeId}-startDate`} size={{ xs: 12, sm: 4 }}>
              <Typography key={`${challengeId}-startDate-label`}>
                Start Date
              </Typography>
              <TextField
                key={`${challengeId}-startDate-input`}
                hiddenLabel
                type="date"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#FFF' }}
                value={getChallenge(challengeId).startDate}
                onChange={(e) =>
                  handleChange(challengeId, 'startDate', e.target.value)
                }
              />
            </Grid>
            <Grid key={`${challengeId}-endDate`} size={{ xs: 12, sm: 4 }}>
              <Typography key={`${challengeId}-endDate-label`}>
                End Date
              </Typography>
              <TextField
                key={`${challengeId}-endDate-input`}
                hiddenLabel
                type="date"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#FFF' }}
                value={getChallenge(challengeId).endDate}
                onChange={(e) =>
                  handleChange(challengeId, 'endDate', e.target.value)
                }
              />
            </Grid>
            <Grid key={`${challengeId}-extraInfo`} size={{ xs: 12, sm: 5 }}>
              <Button
                key={`${challengeId}-extraInfo-button`}
                variant="contained"
                color={
                  getExtraInfo(challengeId, true).some((v) => !v.value)
                    ? 'error'
                    : 'success'
                }
                disabled={!getAnime(challengeId)}
                fullWidth
                onClick={() => setModalState(challengeId, 'extraInfo', true)}
              >
                <Typography key={`${challengeId}-extraInfo-text`}>
                  Extra Info
                </Typography>
              </Button>
              <EditExtraInfoModal
                open={openModals[challengeId]?.extraInfo}
                course={props.currentCourse}
                onClose={() => setModalState(challengeId, 'extraInfo', false)}
                onSave={(extraInfo) =>
                  extraInfoModalOnSave(challengeId, extraInfo)
                }
                challengeData={getChallenge(challengeId)}
              />
            </Grid>
            <Grid
              key={`${challengeId}-manualValidators`}
              size={{ xs: 12, sm: 5 }}
            >
              <Button
                key={`${challengeId}-manualValidators-button`}
                variant="contained"
                color={
                  Object.values(getManualValidators(challengeId)).every(
                    (v) => v.valid
                  )
                    ? 'success'
                    : 'error'
                }
                disabled={!getAnime(challengeId)}
                fullWidth
                onClick={() =>
                  setModalState(challengeId, 'manualValidators', true)
                }
              >
                <Typography key={`${challengeId}-manualValidators-text`}>
                  Manual Validators
                </Typography>
              </Button>
              <EditManualValidatorsModal
                open={openModals[challengeId]?.manualValidators}
                challengeData={getChallenge(challengeId)}
                course={props.currentCourse}
                onClose={() =>
                  setModalState(challengeId, 'manualValidators', false)
                }
                onSave={(manualValidators) =>
                  manualValidatorsOnSave(challengeId, manualValidators)
                }
              />
            </Grid>
            <Grid key={`${challengeId}-settings`} size={{ xs: 12, sm: 2 }}>
              <Button
                key={`${challengeId}-settings-button`}
                variant="contained"
                color="primary"
                disabled={!getAnime(challengeId)}
                fullWidth
                onClick={() => setModalState(challengeId, 'anime', true)}
              >
                <Settings />
              </Button>
              <EditAnimeModal
                open={openModals[challengeId]?.anime}
                onClose={() => setModalState(challengeId, 'anime', false)}
                onSave={(animeDetails) =>
                  infoModalOnSave(challengeId, animeDetails)
                }
                challengeData={getChallenge(challengeId)}
              />
            </Grid>
            <Grid key={`${challengeId}-status`} size={{ xs: 12, sm: 12 }}>
              <HtmlTooltip
                key={`${challengeId}-status-tooltip`}
                title={
                  <Fragment key={`${challengeId}-status-tooltip-fragment`}>
                    {validateAnime(
                      props.config,
                      props.challengeData,
                      challengeId,
                      props.currentCourse
                    ).success.map((s, idx) => (
                      <Typography
                        key={`${challengeId}-status-tooltip-fragment-success-${idx}`}
                        display="block"
                      >
                        ✓ {s}
                      </Typography>
                    ))}
                    {validateAnime(
                      props.config,
                      props.challengeData,
                      challengeId,
                      props.currentCourse
                    ).error.map((e, idx) => (
                      <Typography
                        key={`${challengeId}-status-tooltip-fragment-error-${idx}`}
                        display="block"
                      >
                        ✗ {e}
                      </Typography>
                    ))}
                  </Fragment>
                }
                placement="top"
                arrow
              >
                <Button
                  key={`${challengeId}-status-button`}
                  variant="contained"
                  color={
                    getAnime(challengeId)
                      ? validateAnime(
                          props.config,
                          props.challengeData,
                          challengeId,
                          props.currentCourse
                        ).valid
                        ? 'success'
                        : 'error'
                      : 'warning'
                  }
                  fullWidth
                  disableTouchRipple
                  onClick={() =>
                    onLoadAnime(getChallenge(challengeId).malId, challengeId)
                  }
                >
                  <Typography key={`${challengeId}-status-button-text`}>
                    Status:{' '}
                    {getAnime(challengeId)
                      ? validateAnime(
                          props.config,
                          props.challengeData,
                          challengeId,
                          props.currentCourse
                        ).valid
                        ? 'Valid'
                        : 'Invalid'
                      : 'Click To Load Anime'}
                  </Typography>
                </Button>
              </HtmlTooltip>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
};

export default Course;
