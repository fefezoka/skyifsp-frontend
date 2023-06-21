import React from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Text,
} from '@styles';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { FlightsExamples, Login } from '@components';
import { useAuth } from '../context/AuthContext';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';

export const Header = () => {
  const auth = useAuth();

  return (
    <Grid columns={'3'} align={'center'}>
      <FlightsExamples />
      <Link href={'/'}>
        <Heading
          size="6"
          gradient
          variant={'blue'}
          css={{ width: 'fit-content', m: 'auto' }}
        >
          SKYIFSP
        </Heading>
      </Link>
      {auth.user ? (
        <DropdownMenu>
          <MenuTrigger asChild>
            <Flex
              css={{
                justifySelf: 'end',
                bc: '$bg2',
                br: '$4',
                p: '$2 $3',
                cursor: 'pointer',
                '&:hover': {
                  '& > svg': {
                    transition: 'all 200ms',
                    transform: 'rotate(180deg)',
                  },
                },
              }}
              gap={2}
              align={'center'}
            >
              <Text>{auth.user.name.split(' ')[0]}</Text>
              <Box as={MdKeyboardArrowDown} size={18} css={{ transition: 'all 200ms' }} />
            </Flex>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>{auth.user.name}</MenuItem>
            <MenuItem>
              <Link href={'/config'}>Configurações</Link>
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => auth.logout()} theme={'alert'}>
              Sair
            </MenuItem>
          </MenuContent>
        </DropdownMenu>
      ) : (
        <Login />
      )}
    </Grid>
  );
};
