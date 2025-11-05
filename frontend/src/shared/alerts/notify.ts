import { toast } from 'react-toastify';

const onSuccess = (message: string) => {
  toast.success(message);
};

const onError = (message: string) => {
  toast.error(message);
};

const onInfo = (message: string) => {
  toast.info(message);
};

export const alerts = {
  onSuccess,
  onError,
  onInfo,
};
