import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

import { Container, Header, HeaderButton, InfoWrapper } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password requires at least 6 characters')
    .required('Password is required'),
  name: Yup.string().required('Name is required'),
});

export default function AddStudent(props) {
  const [initialStudent, setInitialStudent] = useState({});

  useEffect(() => {
    async function loadStudent(id) {
      const response = await api.get(`students/${id}`);

      setInitialStudent(response.data);
      console.tron.log(initialStudent);
    }

    const { id } = props.match.params;

    if (id) {
      loadStudent(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit({ name, email, age, weight, height }) {
    console.tron.log('submitted');
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
          <HeaderButton
            type="submit"
            value="submit"
            form="student-form"
            onClick={handleSubmit}
          >
            <MdDone size={20} />
            Save
          </HeaderButton>
        </div>
      </Header>

      <Form
        id="student-form"
        initialData={initialStudent}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <strong>Full Name</strong>
        <Input name="name" placeholder="Full name" />
        <strong>E-mail</strong>
        <Input name="email" type="email" placeholder="example@example.com" />
        <InfoWrapper>
          <div>
            <strong>Age</strong>
            <Input name="age" type="number" />
          </div>
          <div>
            <strong>Weight</strong>
            <Input name="weight" type="number" />
          </div>
          <div>
            <strong>Height</strong>
            <Input name="height" type="number" />
          </div>
        </InfoWrapper>
      </Form>
    </Container>
  );
}

AddStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
