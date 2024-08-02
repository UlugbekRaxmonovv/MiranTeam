// import { Button, TextField, Box } from "@mui/material";
// import { memo, useState } from "react";
// import PropTypes from "prop-types";
// import "../../Sass/index.scss";

// const EditModal = ({ handleClose, handleSave, initialValues }) => {
//     const [formValues, setFormValues] = useState(initialValues);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({
//             ...formValues,
//             [name]: value,
//         });
//     };

//     const handleSaveClick = () => {
//         handleSave(formValues);
//         handleClose();
//     };

//     return (
//         <>
//             <div onClick={handleClose} className="modal__overly"></div>
//             <section className="modal">
//                 <div className="modal__wrapper">
//                     <Box component="form" noValidate autoComplete="off">
//                         <TextField
//                             label="Ism"
//                             name="fname"
//                             value={formValues.fname}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                         />
//                         <TextField
//                             label="Familya"
//                             name="lname"
//                             value={formValues.lname}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                         />
//                         <TextField
//                             label="Telfon raqam"
//                             name="phone_primary"
//                             value={formValues.phone_primary}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                         />
//                         <TextField
//                             label="Manzil"
//                             name="address"
//                             value={formValues.address}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                         />
//                         <TextField
//                             label="Budjet"
//                             name="budget"
//                             type="number"
//                             value={formValues.budget}
//                             onChange={handleInputChange}
//                             fullWidth
//                             sx={{ mb: 2 }}
//                         />
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleSaveClick}
//                                 sx={{ mt: 2 }}
//                             >
//                                 Saqlamoq
//                             </Button>
//                             <Button
//                                 variant="contained"
//                                 color="secondary"
//                                 onClick={handleClose}
//                                 sx={{ mt: 2, ml: 1 }}
//                             >
//                                 Yopmoq
//                             </Button>
//                         </Box>
//                     </Box>
//                 </div>
//             </section>
//         </>
//     );
// };

// EditModal.propTypes = {
//     handleClose: PropTypes.func.isRequired,
//     handleSave: PropTypes.func.isRequired,
//     initialValues: PropTypes.shape({
//         fname: PropTypes.string,
//         lname: PropTypes.string,
//         phone_primary: PropTypes.string,
//         address: PropTypes.string,
//         budget: PropTypes.number,
//     }).isRequired,
// };

// export default memo(EditModal);
