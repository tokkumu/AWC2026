import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AnimeExport, ImportTableProps } from './types';
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const columns: GridColDef<AnimeExport>[] = [
  { headerName: 'ID', field: 'series_animedb_id', width: 75 },
  { headerName: 'Title', field: 'series_title', flex: 1 },
  {
    headerName: 'Type',
    field: 'series_type',
    type: 'singleSelect',
    width: 100,
  },
  {
    headerName: 'Eps',
    field: 'eps',
    valueGetter: (_v, row) =>
      `${row.my_watched_episodes}/${row.series_episodes}`,
    width: 75,
  },
  { headerName: 'Status', field: 'my_status', width: 125 },
  {
    headerName: 'Start Date',
    field: 'my_start_date',
    valueGetter: (v) => (v === '0000-00-00' ? '' : v),
    width: 100,
  },
  {
    headerName: 'Finish Date',
    field: 'my_finish_date',
    valueGetter: (v) => (v === '0000-00-00' ? '' : v),
    width: 100,
  },
  {
    headerName: 'Link',
    field: 'link',
    renderCell: (params: GridRenderCellParams<AnimeExport>) => (
      <OpenInNewIcon
        fontSize="small"
        onClick={() =>
          window.open(
            `https://www.myanimelist.net/anime/${params.row.series_animedb_id}/`,
            '_blank'
          )
        }
      />
    ),
    width: 50,
  },
];

const ImportTable = (props: ImportTableProps) => {
  const [unusedOnlyFilter, setUnusedOnlyFilter] = useState<boolean>(false);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [textFilter, setTextFilter] = useState<string>('');

  const types = useMemo(
    () => [...new Set(props.data.map((r) => r.series_type))],
    [props.data]
  );
  const statuses = useMemo(
    () => [...new Set(props.data.map((r) => r.my_status))],
    [props.data]
  );

  useEffect(() => {
    setTypeFilter(types);
    setStatusFilter(statuses);
  }, [types, statuses]);

  const rows = props.data.filter((r) => {
    const unusedOnlyMatch = !(
      unusedOnlyFilter &&
      Object.values(props.challengeData).some(
        (c) => c.malId === r.series_animedb_id
      )
    );
    const typeMatch = !typeFilter || typeFilter.includes(r.series_type);
    const statusMatch = !statusFilter || statusFilter.includes(r.my_status);
    const textMatch =
      r.series_title.toLowerCase().includes(textFilter.toLowerCase()) ||
      r.series_title
        .toLowerCase()
        .replace(/\W/g, '')
        .includes(textFilter.toLowerCase());
    const validDate =
      r.my_start_date.startsWith('2026-') ||
      (r.my_start_date === '0000-00-00' && r.my_status === 'Plan to Watch');
    return (
      unusedOnlyMatch && typeMatch && statusMatch && textMatch && validDate
    );
  });

  return (
    <div hidden={!props.data.length}>
      <Box display="flex" alignItems="center" gap={1} margin={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={unusedOnlyFilter}
              onChange={(e) => setUnusedOnlyFilter(e.target.checked)}
            />
          }
          sx={{ width: 200 }}
          label="Unused Only?"
        />
        <Select
          value={typeFilter}
          renderValue={(selected) =>
            `Type (${selected.length}/${types.length})`
          }
          onChange={({ target: { value } }) =>
            setTypeFilter(Array.isArray(value) ? value : value.split(','))
          }
          hiddenLabel
          multiple
          fullWidth
          sx={{ backgroundColor: 'white', width: 200 }}
        >
          {types.map((t) => (
            <MenuItem key={t} value={t}>
              <Checkbox checked={typeFilter.includes(t)} />
              {t}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={statusFilter}
          renderValue={(selected) =>
            `Value (${selected.length}/${statuses.length})`
          }
          onChange={({ target: { value } }) =>
            setStatusFilter(Array.isArray(value) ? value : value.split(','))
          }
          hiddenLabel
          multiple
          fullWidth
          sx={{ backgroundColor: 'white', width: 200 }}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              <Checkbox checked={statusFilter.includes(s)} />
              {s}
            </MenuItem>
          ))}
        </Select>
        <TextField
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          label={textFilter ? '' : 'Title'}
          slotProps={{ inputLabel: { shrink: false } }}
          fullWidth
          sx={{ backgroundColor: 'white' }}
        />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.series_animedb_id}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10]}
        disableColumnMenu
        disableColumnResize
        disableAutosize
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ImportTable;
