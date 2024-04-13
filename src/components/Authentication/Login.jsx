import React, { useRef } from "react";
import Modal from "../Common/Modal";

function Login() {
  const modalRef = useRef();
  const handleModalOpen = () => {
    modalRef.current.open();
  };
  const handleModalClose = () => {
    setNewMilstoneValue("");
    modalRef.current.close();
  };
  return (
    <Modal ref={modalRef}>
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "500",
            mb: "8px",
            "& span": {
              color: "#FF0000",
            },
          }}
        >
          user name <span>*</span>
        </Typography>
        <NormalTextField
        // placeholder={"username"}
        // value={}
        // handleChange={}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "500",
            mb: "8px",
            "& span": {
              color: "#FF0000",
            },
          }}
        >
          user name <span>*</span>
        </Typography>
        <NormalTextField
        // placeholder={"username"}
        // value={}
        // handleChange={}
        />
      </Box>
    </Modal>
  );
}

export default Login;
