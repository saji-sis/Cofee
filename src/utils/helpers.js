// const swal = require("sweetalert"); فرقی نداره یا اینطوری ایمپورت بشه یا به شکل پایین
import swal from "sweetalert";


const showSwal = (title, icon, buttons) => {
    swal({ title, icon, buttons });
};

export { showSwal };
