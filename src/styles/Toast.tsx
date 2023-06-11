import {
  ToastContainer as ToastContainerPrimitive,
  toast as ToastPrimitive,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainer = () => (
  <ToastContainerPrimitive
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

export const toast = ToastPrimitive;
