import { Box, Button } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <Box
      sx={{
        "& ::backdrop": {
          background: "#eeeeeedb",
        },
        "& dialog": {
          borderRadius: "12px",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
          width: "100%",
          maxWidth: "620px",
          border: "0",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <dialog
        ref={dialog}
        className="backdrop:bg-stone-900/90 p-4 rounded-sm shadow-md"
      >
        {children}
      </dialog>
    </Box>,
    document.getElementById("modal-root")
  );
});

export default Modal;
