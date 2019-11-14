import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';

import { Container, Header, StudentTable, CrudButton } from './styles';

import api from '~/services/api';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');

      setEnrollments(response.data);
    }

    loadEnrollments();
  }, []);

  async function handleDeleteEnrollment(id) {
    await api.delete(`enrollments/${id}`);

    setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
    toast.success('Enrollments deleted successfully');
  }

  return (
    <Container>
      <Header>
        <strong>Manage Enrollments</strong>
        <button type="button" onClick={() => history.push('/enrollments/add')}>
          <MdAdd size={20} />
          Add Enrollment
        </button>
      </Header>
      <StudentTable>
        <thead>
          <tr>
            <th>Student</th>
            <th>Plan</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr>
              <td>
                <span>name</span>
              </td>
              <td>
                <span>plano</span>
              </td>
              <td>
                <span>{enrollment.start_date}</span>
              </td>
              <td>
                <span>{enrollment.end_date}</span>
              </td>
              <td>
                <span>{enrollment.active}</span>
              </td>
              <td>
                <div>
                  <CrudButton
                    type="button"
                    edit
                    onClick={() =>
                      history.push(`/enrollments/edit/${enrollment.id}`)
                    }
                  >
                    edit
                  </CrudButton>
                  <CrudButton
                    type="button"
                    onClick={() => {
                      if (
                        // eslint-disable-next-line no-alert
                        window.confirm(
                          'Are you sure you wish to delete this item?'
                        )
                      )
                        handleDeleteEnrollment(enrollment.id);
                    }}
                  >
                    delete
                  </CrudButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentTable>
    </Container>
  );
}
