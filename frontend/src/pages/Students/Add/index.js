import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

import {
  Container,
  Header,
  HeaderButton,
  InfoWrapper,
  Wrapper,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password requires at least 6 characters')
    .required('Password is required'),
  name: Yup.string().required('Name is required'),
});

export default function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  async function handleSave() {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Student registered successfully');
      history.push('/students');
    } catch (err) {
      toast.error(
        'Error while trying to register the student, please verify your data'
      );
    }
  }

  function handleNavigationBack() {
    history.push('/students');
  }

  return (
    <Container>
      <Header>
        <strong>Register Student</strong>
        <div>
          <HeaderButton back type="button" onClick={handleNavigationBack}>
            <MdKeyboardArrowLeft size={20} />
            Back
          </HeaderButton>
          <HeaderButton type="button" onClick={handleSave}>
            <MdDone size={20} />
            Save
          </HeaderButton>
        </div>
      </Header>

      <Wrapper>
        <strong>Full Name</strong>
        <input
          name="name"
          placeholder="Full name"
          onChange={e => setName(e.target.value)}
        />
        <strong>E-mail</strong>
        <input
          name="email"
          type="email"
          placeholder="example@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <InfoWrapper>
          <div>
            <strong>Age</strong>
            <input
              name="age"
              type="number"
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <div>
            <strong>Weight</strong>
            <input
              name="weight"
              type="number"
              onChange={e => setWeight(e.target.value)}
            />
          </div>
          <div>
            <strong>Height</strong>
            <input
              name="height"
              type="number"
              onChange={e => setHeight(e.target.value)}
            />
          </div>
        </InfoWrapper>
      </Wrapper>
    </Container>
  );
}
