import React, { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';
import { styled } from 'stitches.config';

const StyledButton = styled('button', {
  all: 'unset',
  ai: 'center',
  boxSizing: 'border-box',
  us: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'inline-flex',
  jc: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  fontWeight: 600,
  transition: 'background-color 200ms, border-bottom-color 300ms ease-out',
  letterSpacing: '-.022em',

  variants: {
    size: {
      1: {
        br: '$1',
        minWidth: 52,
        px: '$3',
        fontSize: '$1',
        height: '$7',
      },
      2: {
        br: '$2',
        minWidth: 80,
        fontSize: '$3',
        px: '$4',
        height: 44,
      },
    },
    variant: {
      gray: {
        bc: '$bg2',
        boxShadow: 'inset 0 0 0 1px $colors$bg3',

        '&:hover': {
          bc: '$bg2',
        },
      },
      red: {
        bc: '$red10',
        boxShadow: 'inset 0 0 0 1px $colors$red8',

        '&:hover': {
          bc: '$red9',
        },
      },
      blue: {
        bc: '$blue10',
        boxShadow: 'inset 0 0 0 1px $colors$blue8',

        '&:hover': {
          bc: '$blue9',
        },
      },
    },
    ghost: {
      true: {
        br: 0,
        bc: 'transparent',
        borderBottom: '2px solid $bg3',
        px: '$4',
        color: '$text-secondary',
        boxShadow: 'none',

        '&:hover': {
          bc: 'transparent',
        },
      },
    },
    active: {
      true: {
        fontWeight: 600,
      },
    },
  },

  compoundVariants: [
    {
      variant: 'blue',
      ghost: true,
      active: true,
      css: {
        color: '$blue10',
        borderBottomColor: '$blue10',

        '&:hover': {
          borderBottomColor: '$blue10 !important',
        },
      },
    },
    {
      variant: 'red',
      ghost: true,
      active: true,
      css: {
        color: '$red10',
        borderBottomColor: '$red10',

        '&:hover': {
          borderBottomColor: '$red10 !important',
        },
      },
    },
  ],

  defaultVariants: {
    size: 2,
    variant: 'blue',
    active: false,
    ghost: false,
  },
});

interface IButton extends React.ComponentProps<typeof StyledButton> {
  Icon?: IconType;
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ Icon, ...props }, forwardedRef) => {
    return (
      <StyledButton type="button" {...props} ref={forwardedRef}>
        {Icon && <Icon size={18} />}
        {!Icon && props.children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
