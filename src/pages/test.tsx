import { Button } from '@mui/material';
import React from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import TextInput from '../components/base/TextInput';
import { toastSuccess } from '../components/base/toast/Toast';
// This page aims to show the result of the different components created.
// It should be remove before merging the branch.
// It also works with JSX inside Notif
const notifySuccess = () =>
  toastSuccess(
    <div>
      <h1>Success</h1>
      <p>This notification works as expected</p>
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </div>
  );
const notifyInfo = () => toast.info('This is an info notification!');
const notifyWarning = () => toast.warning('This is an warning notification!');
const notifyError = () => toast.error('This is an error notification!');

export default function Test() {
  return (
    <>
      <button type="button" onClick={notifySuccess}>
        Notify success!
      </button>
      <br />
      <button type="button" onClick={notifyError}>
        Notify error!
      </button>
      <br />
      <button type="button" onClick={notifyWarning}>
        Notify warning!
      </button>
      <br />
      <button type="button" onClick={notifyInfo}>
        Notify info!
      </button>
      <br />
      {/* Default input */}
      <TextInput label="Default" value="test@gmail.com" />
      {/* Empty input */}
      <TextInput label="Empty" value="" />
      {/* read Only (used in the Profile page) */}
      <TextInput label="" value="readOnly" disabled />
      {/* Input with error */}
      <TextInput
        label="Email error"
        value="test@gmailcom"
        helperText="Email adress is not valid"
        error
      />
      {/* Disabled input */}
      <TextInput label="Email" value="test@gmail.com" disabled />
      <Button type="button" disabled>
        hello
      </Button>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        transition={Flip}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
