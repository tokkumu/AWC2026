import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Input,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ChallengeEntry, ExtraInfo } from './types';
import { Create, Delete } from '@mui/icons-material';
import { CourseItem } from '../../types';

type EditExtraInfoModal = {
  open?: boolean;
  course: CourseItem;
  challengeData: ChallengeEntry;
  onSave: (updatedInfo: ExtraInfo[]) => void;
  onClose: () => void;
};

const EditExtraInfoModal: React.FC<EditExtraInfoModal> = ({
  open,
  course,
  onClose,
  challengeData,
  onSave,
}) => {
  const [formData, setFormData] = useState<ExtraInfo[]>(
    challengeData.extraInfo.filter(
      (v) => !v.courses || v.courses.includes(course)
    )
  );

  useEffect(() => {
    setFormData(
      challengeData.extraInfo.filter(
        (v) => !v.courses || v.courses.includes(course)
      )
    );
  }, [challengeData]);

  const handleChange = (idx: number, value: string) => {
    setFormData((data) => {
      const newData = [...data];
      newData[idx] = { ...newData[idx], value };
      return newData;
    });
  };

  const handleCancel = () => {
    setFormData(
      challengeData.extraInfo.filter(
        (v) => !v.courses || v.courses.includes(course)
      )
    );
    onClose();
  };

  const handleSave = () => {
    onSave(formData!);
    onClose();
  };

  const createExtraInfo = () => {
    setFormData((data) => [
      ...data,
      {
        key: '',
        value: 'New Extra Info: example',
        required: false,
      },
    ]);
  };

  const deleteExtraInfo = (idx: number) => {
    setFormData((data) => data.filter((_v, i) => i !== idx));
  };

  return (
    <Dialog open={open ?? false} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Extra Info</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {formData?.map((extraInfo, idx) => (
            <React.Fragment>
              {extraInfo.required && (
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography key={`${idx}-extraInfo-text`}>
                    {extraInfo.key}
                  </Typography>
                </Grid>
              )}
              <Grid size={{ xs: 12, sm: extraInfo.required ? 8 : 11 }}>
                <Input
                  key={`${idx}-extraInfo-input`}
                  fullWidth
                  required={extraInfo.required}
                  value={extraInfo.value}
                  onChange={(e) => handleChange(idx, e.target.value)}
                />
              </Grid>
              {!extraInfo.required && (
                <Grid size={{ xs: 12, sm: 1 }}>
                  <Button
                    key={`${idx}-extraInfo-delete`}
                    disabled={extraInfo.required}
                    onClick={() => deleteExtraInfo(idx)}
                  >
                    <Delete />
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Button
              key="extraInfo-add"
              variant="outlined"
              fullWidth
              onClick={createExtraInfo}
            >
              <Create />
            </Button>
          </Grid>
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

export default EditExtraInfoModal;
