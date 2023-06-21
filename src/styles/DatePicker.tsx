import React from 'react';
import { default as PrimitiveDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '@styles';
import ptBR from 'date-fns/locale/pt-BR';
import { CSS } from '../../stitches.config';

export const DatePicker = (
  props: React.ComponentProps<typeof PrimitiveDatePicker> & { css?: CSS }
) => {
  return (
    <PrimitiveDatePicker
      locale={ptBR}
      minDate={new Date()}
      placeholderText="Selecionar data"
      dateFormat={'dd/MM/yyyy'}
      customInput={<Input css={{ br: 0, ...props.css }} />}
      {...props}
    />
  );
};
