/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  label: string;
  value: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


const TextInput: React.FC<Props> = ({
  label,
  value,
  disabled = false,
  error = false,
  helperText = '',
  variant = 'standard',
  onChange = undefined,
  ...props
}) => <TextField 
      label={label}
      value={value}
      disabled={disabled}
      error={error}
      helperText={helperText}
      onChange={onChange}
      variant={variant}
      {...props}
    />
    

export default TextInput;
