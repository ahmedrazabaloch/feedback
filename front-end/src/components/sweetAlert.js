import Swal from "sweetalert2";

const SweetAlert = ({ message, icon }) => {
  Swal.fire({
    icon: icon || "success", 
    title: message,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export default SweetAlert;
