import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { default as PrimitiveDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '@styles';
import ptBR from 'date-fns/locale/pt-BR';

interface IDatePicker
  extends Omit<React.ComponentProps<typeof PrimitiveDatePicker>, 'onChange'> {
  control: Control;
  name: string;
  defaultValue?: Date;
}

export const DatePicker = ({ control, name, defaultValue, ...props }: IDatePicker) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <PrimitiveDatePicker
          locale={ptBR}
          minDate={new Date()}
          placeholderText="Selecionar data"
          onChange={(date) => field.onChange(date)}
          selected={field.value}
          dateFormat={'dd/MM/yyyy'}
          customInput={<Input />}
          {...props}
        />
      )}
    />
  );
};
