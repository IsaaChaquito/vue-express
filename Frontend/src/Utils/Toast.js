import { TOAST_PLACEMENT, TOAST_STATUS, Toast } from 'bootstrap-toaster';

function toast(title, message = 'success', status = 'success', timeout = 3000, setPlacement = 'top-right') {
  if (status === 'success') {
    status = TOAST_STATUS.SUCCESS;
  } else if (status === 'danger') {
    status = TOAST_STATUS.DANGER;
  } else if (status === 'warning') {
    status = TOAST_STATUS.WARNING;
  } else {
    status = TOAST_STATUS.INFO;
  }

  if (setPlacement === 'top-right') {
    Toast.setPlacement(TOAST_PLACEMENT.TOP_RIGHT);
  } else {
    Toast.setPlacement(TOAST_PLACEMENT.BOTTOM_RIGHT);
  }

  let toast = {
    title: title,
    message: message,
    status: status,
    timeout: timeout,
  };

  const fire = () => {
    Toast.create(toast);
  };

  return { fire };
}

export default toast;
