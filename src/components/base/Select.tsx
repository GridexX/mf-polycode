import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { uuid } from 'uuidv4'; 

type Item = {
  name: string;
  value: string;
};

type Props = {
  label: string;
  items: Item[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  id?: string;
};

export default function CustomSelect(props: Props) {
  const { label, items, value, onChange, id } = props;
  const labelId = uuid();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* label */}
        <InputLabel id={labelId}>{label}</InputLabel>
        {/* select */}
        <Select
          labelId={labelId}
          label={label}
          id={id}
          value={value}
          onChange={onChange}
        >
          {/* menu items */}
          {items && items.length > 0
            ? items.map((item: Item) => (
                <MenuItem key={item.name} value={item?.value}>
                  {item?.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </Box>
  );
}

CustomSelect.defaultProps = {
  id: 'selectId',
};
