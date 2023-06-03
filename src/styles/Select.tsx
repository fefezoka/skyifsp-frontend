import React from 'react';
import ReactSelect from 'react-select';

export const Select = (props: React.ComponentProps<ReactSelect>) => {
  return (
    <ReactSelect
      {...props}
      instanceId={'selectbox'}
      styles={{
        input: (baseStyles) => ({
          ...baseStyles,
          minHeight: '36px',
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--colors-slate11)',
          fontSize: 'var(--fontSizes-2)',
          marginLeft: '4px',
          fontWeight: 500,
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--colors-slate12)',
          marginLeft: '4px',
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          fontSize: '14px',
          backgroundColor: 'var(--colors-bg2)',
          boxShadow: 'inset 0 0 0 1px var(--colors-bg3)',
          border: 0,
          borderRadius: '8px',
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          fontSize: '14px',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'var(--colors-bg2)',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected ? 'var(--colors-blue9)' : 'var(--colors-bg2)',

          ':hover': {
            backgroundColor: 'var(--colors-blue9)',
          },
        }),
      }}
    />
  );
};

Select.displayName = 'Select';
