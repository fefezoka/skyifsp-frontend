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
} from '@styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginType = z.infer<typeof loginSchema>;

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type SignUpType = z.infer<typeof signUpSchema>;

export const Login = () => {
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
      await auth.signIn(data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (data: SignUpType) => {
    try {
      await auth.signUp(data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Flex
          align={'center'}
          justify={'center'}
          css={{ br: '$round', bc: '$bg3', size: 36, cursor: 'pointer' }}
        >
          <FaUser />
        </Flex>
      </ModalTrigger>
      <ModalContent css={{ p: 0 }}>
        <Tabs defaultValue="login" onValueChange={(value) => setTab(value as typeof tab)}>
          <TabsList asChild>
            <Flex justify={'center'} css={{ borderBottom: '2px solid $bg2' }}>
              <TabsTrigger value="login" asChild>
                <Button
                  ghost
                  active={tab === 'login'}
                  css={{ fontSize: '$4', height: 48 }}
                >
                  Login
                </Button>
              </TabsTrigger>
              <TabsTrigger value="signup" asChild>
                <Button
                  ghost
                  active={tab === 'signup'}
                  css={{ fontSize: '$4', height: 48 }}
                >
                  Cadastro
                </Button>
              </TabsTrigger>
            </Flex>
          </TabsList>
          <TabsContent value="login">
            <Box as={'form'} onSubmit={login.handleSubmit(handleSignIn)}>
              <Box css={{ mt: '$4' }}>
                <Text>Email</Text>
                <Input {...login.register('email')} />
              </Box>
              <Box css={{ mt: '$4' }}>
                <Text>Senha</Text>
                <Input type={'password'} {...login.register('password')} />
              </Box>
              <Flex css={{ mt: '$6' }} justify={'end'}>
                <Button type={'submit'} css={{ width: '100%' }}>
                  Logar
                </Button>
              </Flex>
            </Box>
          </TabsContent>
          <TabsContent value="signup">
            <Box as={'form'} onSubmit={signUp.handleSubmit(handleSignUp)}>
              <Box css={{ mt: '$4' }}>
                <Text>Nome</Text>
                <Input {...signUp.register('name')} />
              </Box>
              <Box css={{ mt: '$4' }}>
                <Text>Email</Text>
                <Input {...signUp.register('email')} />
              </Box>
              <Box css={{ mt: '$4' }}>
                <Text>Senha</Text>
                <Input type={'password'} {...signUp.register('password')} />
              </Box>
              <Flex css={{ mt: '$6' }} justify={'end'}>
                <Button type={'submit'} css={{ width: '100%' }}>
                  Cadastrar
                </Button>
              </Flex>
            </Box>
          </TabsContent>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};
