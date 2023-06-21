import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Box, Button, DatePicker, Flex, Heading, Input, Text, toast } from '@styles';
import { Header } from '@components';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import axios from '../services/axios';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userToken = ctx.req.cookies['skyifsp.session_token'];

  if (!userToken) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const infoSchema = z.object({
  name: z.string().nonempty().min(4),
  email: z.string().email(),
  birthdate: z.date(),
});

type InfoData = z.infer<typeof infoSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty().min(4),
    newPassword: z.string().nonempty().min(4),
    confirmNewPassword: z.string().nonempty().min(4),
  })
  .superRefine((data, ctx) => {
    if (data.confirmNewPassword !== data.newPassword) {
      ctx.addIssue({ code: 'custom', path: ['confirmNewPassword'] });
    }

    if (data.currentPassword === data.newPassword) {
      ctx.addIssue({ code: 'custom', path: ['newPassword'] });
    }
  });

type PasswordData = z.infer<typeof passwordSchema>;

const deleteAccountSchema = z.object({
  currentPassword: z.string().nonempty().min(4),
});

type DeleteAccountData = z.infer<typeof deleteAccountSchema>;

export default function Config() {
  const router = useRouter();
  const auth = useAuth();
  const infoForm = useForm<InfoData>({ resolver: zodResolver(infoSchema) });
  const passwordForm = useForm<PasswordData>({ resolver: zodResolver(passwordSchema) });
  const deleteAccountForm = useForm<DeleteAccountData>({
    resolver: zodResolver(deleteAccountSchema),
  });

  if (!auth.user) {
    return <></>;
  }

  const handleInfoSubmit = async (data: InfoData) => {
    try {
      await axios.put('/users', {
        ...data,
        email: data.email === auth.user?.email ? undefined : data.email,
      });
      toast.done('Dados alterados com sucesso');
      router.reload();
    } catch (error) {
      toast.error('Erro');
    }
  };

  const handlePasswordSubmit = async (data: PasswordData) => {
    try {
      await axios.put('/users/password', data);
      toast.done('Senha alterada com sucesso');
      router.reload();
    } catch (error) {
      toast.error('Senha atual inválida');
    }
  };
  const handleDeleteAccountSubmit = async (data: DeleteAccountData) => {
    try {
      await axios.delete('/users?currentPassword=' + data.currentPassword);
      auth.logout();
    } catch (error) {
      toast.error('Senha atual inválida');
    }
  };

  return (
    <Box as={'main'}>
      <Box css={{ borderBottom: '2px solid $bg2' }}>
        <Box
          css={{
            maxWidth: 920,
            m: 'auto',
            p: '$6',
          }}
        >
          <Header />
        </Box>
      </Box>
      <Flex
        justify={'center'}
        gap={'4'}
        css={{ m: '$5', mt: 64 }}
        direction={{ '@initial': 'column', '@bp2': 'row' }}
      >
        <Box
          css={{
            width: 300,
            br: '$5',
            pt: '$4',
            '& > div': { py: '$4' },
          }}
        >
          <Heading size="3">Configurações</Heading>
          <Box css={{ mt: '$6' }}>
            <Link href={'#info'}>
              <Text size={'6'} weight={600}>
                INFORMAÇÕES PESSOAIS
              </Text>
            </Link>
          </Box>
          <Box>
            <Link href={'#password'}>
              <Text size={'6'} weight={600}>
                ALTERAR CREDENCIAIS
              </Text>
            </Link>
          </Box>
          <Box>
            <Link href={'#delete-account'}>
              <Text size={'6'} variant={'red'} weight={600}>
                EXCLUIR CONTA
              </Text>
            </Link>
          </Box>
        </Box>
        <Box css={{ '& > div': { mb: '$5' } }}>
          <Flex
            direction={{ '@initial': 'column', '@bp2': 'row' }}
            id="info"
            css={{
              bc: '$bg2',
              width: '100%',
              '@bp2': { width: 780 },
              br: '$5',
              overflow: 'hidden',
            }}
          >
            <Box css={{ width: 320, p: '$6', fs: 0 }}>
              <Heading size="2">INFORMAÇÕES PESSOAIS</Heading>
            </Box>
            <Box
              css={{ width: '100%', p: '$6' }}
              as={'form'}
              onSubmit={infoForm.handleSubmit(handleInfoSubmit)}
            >
              <Text>Nome</Text>
              <Input
                {...infoForm.register('name')}
                css={{ bc: '$bg3', mb: '$2' }}
                defaultValue={auth.user?.name}
              />
              <Text>Email</Text>
              <Input
                {...infoForm.register('email')}
                css={{ bc: '$bg3', mb: '$2' }}
                defaultValue={auth.user?.email}
              />
              <Text>Data de nascimento</Text>
              <Controller
                name="birthdate"
                control={infoForm.control}
                defaultValue={auth.user?.birthdate}
                render={({ field }) => (
                  <DatePicker
                    minDate={new Date(1920)}
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    onChange={field.onChange}
                    yearDropdownItemNumber={100}
                    css={{ bc: '$bg3', br: '$2' }}
                    selected={infoForm.watch?.('birthdate') || auth.user?.birthdate}
                  />
                )}
              />
              <Button type="submit" css={{ width: '100%', mt: '$4' }}>
                SALVAR ALTERAÇÕES
              </Button>
            </Box>
          </Flex>
          <Flex
            id="password"
            direction={{ '@initial': 'column', '@bp2': 'row' }}
            css={{
              bc: '$bg2',
              width: '100%',
              '@bp2': { width: 780 },
              br: '$5',
              overflow: 'hidden',
            }}
          >
            <Box css={{ width: 320, p: '$6', fs: 0 }}>
              <Heading size="2">ALTERAR CREDENCIAIS</Heading>
            </Box>
            <Box
              css={{ width: '100%', p: '$6' }}
              as={'form'}
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            >
              <Text>Senha atual</Text>
              <Input
                type="password"
                {...passwordForm.register('currentPassword')}
                css={{ bc: '$bg3', mb: '$2' }}
              />
              <Text>Nova senha</Text>
              <Input
                type="password"
                {...passwordForm.register('newPassword')}
                css={{ bc: '$bg3', mb: '$2' }}
              />
              <Text>Confirmar a nova senha</Text>
              <Input
                type="password"
                {...passwordForm.register('confirmNewPassword')}
                css={{ bc: '$bg3' }}
              />
              <Button type="submit" css={{ width: '100%', mt: '$4' }}>
                SALVAR ALTERAÇÕES
              </Button>
            </Box>
          </Flex>
          <Flex
            id="delete-account"
            direction={{ '@initial': 'column', '@bp2': 'row' }}
            css={{
              bc: '$bg2',
              width: '100%',
              '@bp2': { width: 780 },
              br: '$5',
              overflow: 'hidden',
            }}
          >
            <Box css={{ width: 320, p: '$6', fs: 0 }}>
              <Heading size="2">EXCLUIR CONTA</Heading>
              <Box>
                <Text>O processo de exclusão da conta é irreversível.</Text>
              </Box>
            </Box>
            <Box
              css={{ width: '100%', p: '$6' }}
              as={'form'}
              onSubmit={deleteAccountForm.handleSubmit(handleDeleteAccountSubmit)}
            >
              <Text>Para confirmar a exclusão, digite sua senha atual.</Text>
              <Input
                type="password"
                {...deleteAccountForm.register('currentPassword')}
                css={{ bc: '$bg3' }}
              />
              <Button type="submit" variant={'red'} css={{ mt: '$4', width: '100%' }}>
                EXCLUIR
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
