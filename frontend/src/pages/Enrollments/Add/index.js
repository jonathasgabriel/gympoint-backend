import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import SaveButton from '~/components/Buttons/SaveButton';
import BackButton from '~/components/Buttons/BackButton';

import history from '~/services/history';

import api from '~/services/api';

import { Container, Header, InfoWrapper } from './styles';

const schema = Yup.object().shape({
  student: Yup.string().required('Student is required'),
  plan: Yup.string().required('Plan is required'),
  startDate: Yup.string().required('Start Date is required'),
});

export default function AddEnrollment(props) {
  const [initialEnrollment, setInitialEnrollment] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function loadEnrollment(id) {
      const response = await api.get(`enrollments/${id}`);

      setInitialEnrollment(response.data);
      setEditMode(true);
    }

    const { id } = props.match.params;

    if (id) {
      loadEnrollment(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      if (editMode) {
        await api.put(`enrollments/${initialEnrollment.id}`, {
          name,
          email,
          age,
          weight,
          height,
        });

        toast.success('Enrollment updated successfully');
      } else {
        await api.post('enrollments', {
          name,
          email,
          age,
          weight,
          height,
        });

        toast.success('Enrollment added successfully');
      }

      history.push('/enrollments');
    } catch (err) {
      toast.error(
        'Error while trying to create the enrollment, please verify your data'
      );
    }
  }

  return (
    <Container>
      <Header>
        <strong>{editMode ? 'Edit Enrollment' : 'Create Enrollment'}</strong>
        <div>
          <BackButton redirectPage="/enrollments" />
          <SaveButton formSubmit="enrollment-form" />
        </div>
      </Header>

      <Form
        id="enrollment-form"
        initialData={initialEnrollment}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <strong>Student</strong>
        <Input name="student" placeholder="Full name" />
        <InfoWrapper>
          <div>
            <strong>Plan</strong>
            <Input name="plan" />
          </div>
          <div>
            <strong>Start Date</strong>
            <Input name="startDate" />
          </div>
          <div>
            <strong>End Date</strong>
            <Input disabled name="endDate" />
          </div>
          <div>
            <strong>Total Price</strong>
            <Input disabled name="totalPrice" />
          </div>
        </InfoWrapper>
      </Form>
    </Container>
  );
}

AddEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
