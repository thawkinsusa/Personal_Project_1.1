
import React from 'react'
import { NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';

export const SuccessfulLogin = {
  message: 'You have been logged in!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 1000,
  canDismiss: true,
  icon: <i className="fa fa-check" />
}