import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Item = {
  name: string;
  value: string;
};

type Props = {
  label: string;
  items: Item[];
  labelId?: string;
  id?: string;
};

export default function CustomSelect(props: Props) {
  const { label, items, labelId, id } = props;

  const [selectedValue, setSelectedValue] = React.useState<string>(
    items[0]?.value
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

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
          value={selectedValue}
          onChange={handleChange}
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
  labelId: 'labelId',
};
