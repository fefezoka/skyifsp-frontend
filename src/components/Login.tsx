import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  ToastContainer,
  toast,
} from '@styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { AiOutlineUser } from 'react-icons/ai';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(22),
});

type LoginType = z.infer<typeof loginSchema>;

const signUpSchema = z
  .object({
    name: z.string().min(3).max(64),
    email: z.string().email(),
    password: z.string().min(4).max(22),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: 'custom', path: ['confirmPassword'] });
    }
  });

type SignUpType = z.infer<typeof signUpSchema>;

export const Login = () => {
  const [loading, setLoading] = useState<boolean>();
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  const auth = useAuth();

  const login = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const signUp = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignIn = async (data: LoginType) => {
    try {
      setLoading(true);
      await auth.login(data);
    } catch (error) {
      setLoading(false);
      toast.error('Email ou senha incorretos');
    }
  };

  const handleSignUp = async (data: SignUpType) => {
    try {
      setLoading(true);

      const { confirmPassword, ...signUpData } = data;

      await auth.signUp({
        ...signUpData,
        name: data.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
      });

      await new Promise((resolve) => setTimeout(resolve, 700));

      await auth.login({ email: data.email, password: data.password });
    } catch (error: any) {
      error.response.status === 409 && toast.error('Email já cadastrado');
      setLoading(false);
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Flex
            css={{ height: 36, cursor: 'pointer' }}
            align={'center'}
            gap={'2'}
            justify={'end'}
          >
            <AiOutlineUser color="var(--colors-blue9)" size={18} />
            <Text weight={600}>ENTRAR</Text>
          </Flex>
        </ModalTrigger>
        <ModalContent css={{ p: 0 }}>
          <Tabs defaultValue={tab} onValueChange={(value) => setTab(value as typeof tab)}>
            <TabsList asChild>
              <Flex justify={'center'} css={{ borderBottom: '2px solid $bg2' }}>
                <TabsTrigger value="login" asChild>
                  <Button
                    ghost
                    active={tab === 'login'}
                    css={{ fontSize: '$4', height: 48, flex: 1 }}
                  >
                    Login
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="signup" asChild>
                  <Button
                    ghost
                    active={tab === 'signup'}
                    css={{ fontSize: '$4', height: 48, flex: 1 }}
                  >
                    Cadastro
                  </Button>
                </TabsTrigger>
              </Flex>
            </TabsList>
            <TabsContent value="login">
              <Box as={'form'} onSubmit={login.handleSubmit(handleSignIn)}>
                <Box css={{ mb: '$4' }}>
                  <Flex justify={'between'} css={{ mb: '$2' }}>
                    <Text>Email</Text>
                    {login.formState.errors.email && (
                      <Text weight={600} variant={'red'}>
                        Email inválido
                      </Text>
                    )}
                  </Flex>
                  <Input {...login.register('email')} />
                </Box>
                <Box css={{ mb: '$4' }}>
                  <Flex justify={'between'} css={{ mb: '$2' }}>
                    <Text>Senha</Text>
                    {login.formState.errors.password && (
                      <Text weight={600} variant={'red'}>
                        Senha inválida
                      </Text>
                    )}
                  </Flex>
                  <Input type={'password'} {...login.register('password')} />
                </Box>
                <Flex css={{ mt: '$6' }} justify={'end'}>
                  <Button type={'submit'} css={{ width: '100%' }} loading={loading}>
                    Logar
                  </Button>
                </Flex>
              </Box>
            </TabsContent>
            <TabsContent value="signup">
              <Box as={'form'} onSubmit={signUp.handleSubmit(handleSignUp)}>
                <Box css={{ mb: '$4' }}>
                  <Flex justify={'between'} css={{ mb: '$2' }}>
                    <Text>Nome</Text>
                    {signUp.formState.errors.name && (
                      <Text weight={600} variant={'red'}>
                        Nome inválido
                      </Text>
                    )}
                  </Flex>
                  <Input {...signUp.register('name')} />
                </Box>
                <Box css={{ mb: '$4' }}>
                  <Flex justify={'between'} css={{ mb: '$2' }}>
                    <Text>Email</Text>
                    {signUp.formState.errors.email && (
                      <Text weight={600} variant={'red'}>
                        Email inválido
                      </Text>
                    )}
                  </Flex>
                  <Input {...signUp.register('email')} />
                </Box>
                <Box css={{ mb: '$4' }}>
                  <Flex justify={'between'} css={{ mb: '$2' }}>
                    <Text>Senha</Text>
                    {signUp.formState.errors.password && (
                      <Text weight={600} variant={'red'}>
                        Senha inválida
                      </Text>
                    )}
                  </Flex>
                  <Input type={'password'} {...signUp.register('password')} />
                </Box>
                <Box css={{ mb: '$4' }}>
                  <Flex justify={'between'} css={{ mb: '$2' }}>
                    <Text>Confirmar senha</Text>
                    {signUp.formState.errors.confirmPassword && (
                      <Text weight={600} variant={'red'}>
                        Senhas não coincidem
                      </Text>
                    )}
                  </Flex>
                  <Input type={'password'} {...signUp.register('confirmPassword')} />
                </Box>
                <Flex css={{ mt: '$6' }} justify={'end'}>
                  <Button type={'submit'} css={{ width: '100%' }} loading={loading}>
                    Cadastre-se
                  </Button>
                </Flex>
              </Box>
            </TabsContent>
          </Tabs>
        </ModalContent>
      </Modal>
    </Box>
  );
};
