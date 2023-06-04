import { styled } from 'stitches.config';

export const Input = styled('input', {
  width: '100%',
  px: '$5',
  border: 'none',
  br: '$7',
  fontSize: '$3',
  bc: '$bg2',
  color: '$slate12',
  minHeight: 44,
  boxShadow: 'inset 0 0 0 1px $colors$bg3',

  '&::placeholder': {
    color: '$slate11',
    fontWeight: 500,
    fontSize: '$2',
  },

  '&:disabled': {
    color: '$slate11',
  },

  variants: {
    radius: {
      '1': {
        br: '$2',
        px: '$3',
      },
      '2': {
        br: '$7',
        px: '$5',
      },
    },
  },

  defaultVariants: {
    radius: '1',
  },
});
