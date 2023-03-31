import { observer } from 'mobx-react-lite';
import { useMobXStore } from '@store/index';

import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { APP_NAME } from '@shared/constants';

import { Button, Header } from 'semantic-ui-react';
import { TextInput } from '@shared/components/form-inputs';
import { ValidationErrorList } from '@features/errors';

const validationSchema = Yup.object({
  displayName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

function RegisterForm() {
  const {
    userStore: { register },
  } = useMobXStore();

  return (
    <Formik
      initialValues={{
        displayName: '',
        username: '',
        email: '',
        password: '',
        error: null,
      }}
      onSubmit={(values, { setErrors }) => register(values).catch((error) => setErrors({ error }))}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit}>
          <Header as="h2" content={`Sign Up to ${APP_NAME}`} color="teal" textAlign="center" />
          <TextInput name="displayName" placeholder="Display Name" />
          <TextInput name="username" placeholder="User Name" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage name="error" render={() => <ValidationErrorList errors={errors.error} />} />
          <Button
            fluid
            positive
            type="submit"
            content="Register"
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
