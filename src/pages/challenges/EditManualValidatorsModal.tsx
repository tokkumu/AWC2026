import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Checkbox,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ChallengeEntry } from './types';
import { CourseItem } from '../../types';
import { getManualValidatorsForChallenge } from './data/data';
import stringHash from 'string-hash';

type EditManualValidatorsModal = {
  open?: boolean;
  course: CourseItem;
  challengeData: ChallengeEntry;
  onSave: (updatedData: ChallengeEntry['manualValidators']) => void;
  onClose: () => void;
};

const EditManualValidatorsModal: React.FC<EditManualValidatorsModal> = ({
  open,
  course,
  onClose,
  challengeData,
  onSave,
}) => {
  const [formData, setFormData] = useState<ChallengeEntry['manualValidators']>(
    challengeData.manualValidators
  );

  useEffect(() => {
    setFormData(challengeData.manualValidators);
  }, [challengeData]);

  const handleChange = (hash: number) => {
    setFormData((data) => ({
      ...data,
      [hash]: {
        ...data[hash],
        valid: !data[hash].valid,
      },
    }));
  };

  const handleCancel = () => {
    setFormData(challengeData.manualValidators);
    onClose();
  };

  const handleSave = () => {
    onSave(formData!);
    onClose();
  };

  return (
    <Dialog open={open ?? false} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Manual Validators</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {getManualValidatorsForChallenge(challengeData.id, course).map(
            (validator) => {
              const hash = stringHash(validator);
              const checked = formData[hash].valid;
              return (
                <React.Fragment key={`${hash}-manualValidator`}>
                  <Grid size={{ xs: 10, sm: 10 }}>
                    <Typography>{validator}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2, sm: 2 }}>
                    <Checkbox
                      checked={checked}
                      onClick={() => {
                        handleChange(stringHash(validator));
                      }}
                    />
                  </Grid>
                </React.Fragment>
              );
            }
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditManualValidatorsModal;
