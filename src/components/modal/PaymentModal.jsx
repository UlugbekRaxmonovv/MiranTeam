import { TextField, TextareaAutosize, Button } from "@mui/material";
import "../../Sass/index.scss";
import PropTypes from "prop-types";
import { memo } from "react";

const PaymentModal = ({ handleClose }) => {
    return (
        <>
            <div onClick={handleClose} className="modal__overly"></div>
            <section className="modal">
                <div className="modal__wrapper">
                    <form className="modal__form">
                        <TextField
                            label="To'lov"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            name="payment"
                        />
                        <TextareaAutosize
                            minRows={3}
                            placeholder="Text area"
                            style={{ width: '100%', marginTop: '16px', padding: '8px', resize: "none" }}
                        />
                        <div className="modal__button-card">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={""}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                To{"'"}lov
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                                fullWidth
                                sx={{ mt: 2, ml: 1 }}
                            >
                                Yopmoq
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

PaymentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default memo(PaymentModal);
