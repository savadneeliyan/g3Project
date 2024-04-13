import { Box, Button, FormHelperText, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AutoCompleteSelectField,
  SelectFieldWithLabel,
} from "../../InputFields/SelectInputFields";
import ColorPicker from "../../InputFields/ColorPicker";
import Modal from "../../Common/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { NormalTextField } from "../../InputFields/TextFields";
import { DeleteIcon, EditIcon, Star, ViewIcon } from "../../Icons/Icons";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TemplateContext } from "../../Context/TemplateContext";
import { useNavigate } from "react-router-dom";

function AddTemplateMain() {
  const { templateData, setTemplateData } = useContext(TemplateContext);
  const navigate = useNavigate();

  const modalRef = useRef();

  // dropdown lists --------------------------------
  let array = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "12 Angry Men",
    "Schindler's List",
    "Pulp Fiction",
    "The Lord of the Rings: The Return of the King",
    "customButton",
  ];

  let templateOptions = [
    "template 1",
    "template 2",
    "template 3",
    "template 4",
    "template 5",
    "template 6",
    "template 7",
    "template 8",
    "template 9",
  ];

  // states --------------------------------

  const [formData, setFormData] = useState({
    progressionColor: "#FFA500",
    completedColor: "#008000",
    delayedColor: "#FF0000",
    milestones: [],
  });
  const [mileStonesListed, setMileStonesListed] = useState(array);
  const [newMilstoneValue, setNewMilstoneValue] = useState();
  const [tasks, setTasks] = useState({
    milestoneName: "",
    TaskName: "",
  });
  const [errorData, setErrorData] = useState({});
  const [selectedTasks, setSelectedTasks] = useState({
    milestoneName: "",
    TaskName: [],
  });

  // for seting formdata on input change --------------------------------
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // modal handlers --------------------------------
  const handleModalOpen = () => {
    modalRef.current.open();
  };
  const handleModalClose = () => {
    modalRef.current.close();
  };

  // tasks operations --------------------------------

  const handleTaskChanges = (e) => {
    const { value, name } = e.target;
    if (name === "milestoneName") {
      setTasks(() => ({
        [name]: value,
        TaskName: "",
      }));

      setSelectedTasks({
        milestoneName: "",
        TaskName: [],
      });
    } else {
      setTasks((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectedTasks = () => {
    if (taskValidate()) {
      setSelectedTasks((prev) => ({
        milestoneName: tasks.milestoneName,
        TaskName: [...prev.TaskName, tasks.TaskName],
      }));

      setTasks((prev) => ({
        ...prev,
        TaskName: "",
      }));
    }
  };

  // add milestones operations --------------------------------

  const handleAddMileStones = () => {
    if (MileStoneValidate()) {
      setFormData((prev) => ({
        ...prev,
        milestones: [...prev.milestones, selectedTasks],
      }));
      setTasks({ milestoneName: "", TaskName: "" });
      setSelectedTasks({
        milestoneName: "",
        TaskName: [],
      });
    }
  };

  const handleAddNewMilestone = (e) => {
    e.preventDefault();
    if (NewMIileStoneValidate()) {
      let filteredArray = mileStonesListed.filter(
        (item) => item !== "customButton"
      );
      let newData = filteredArray.concat([newMilstoneValue, "customButton"]);
      setMileStonesListed(newData);
      setNewMilstoneValue("");
      handleModalClose();
      toast.success("MileStone added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // validations operations --------------------------------

  const MileStoneValidate = () => {
    const errors = {};
    let validate = true;

    if (selectedTasks.TaskName.length === 0) {
      errors.selectedTasksTaskName = "Add any tasks to save milestone";
      validate = false;
    }
    setErrorData(errors);
    return validate;
  };

  const NewMIileStoneValidate = () => {
    const errors = {};
    let validate = true;

    if (!newMilstoneValue.trim()) {
      errors.newMilstoneValue = "Milestone name is required";
      validate = false;
    }

    console.log(errors, "errors");
    setErrorData(errors);
    return validate;
  };

  const taskValidate = () => {
    const errors = {};
    let validate = true;

    if (!tasks.milestoneName.trim()) {
      errors.milestoneName = "Milestone name is required";
      validate = false;
    }

    if (!tasks.TaskName.trim()) {
      errors.TaskName = "Task name is required";
      validate = false;
    }

    console.log(errors, "errors");
    setErrorData(errors);
    return validate;
  };

  const validate = () => {
    const errors = {};
    let validate = true;

    if (!formData.templateType) {
      errors.templateType = "Template type is required";
      validate = false;
    }

    if (!formData.templateName) {
      errors.templateName = "Template name is required";
      validate = false;
    }

    if (formData?.milestones?.length === 0) {
      errors.selectedTasksTaskName = "Add any tasks to save milestone";
      validate = false;
    }

    // if (!tasks.milestoneName.trim()) {
    //   errors.milestoneName = "Milestone name is required";
    //   validate = false;
    // }

    // if (!tasks.TaskName.trim()) {
    //   errors.TaskName = "Task name is required";
    //   validate = false;
    // }
    
    setErrorData(errors);
    return validate;
  };
  console.log(errorData, "errors");

  // submit or cancel form operations --------------------------------

  const cancelForm = () => {
    setFormData({
      progressionColor: "#FFA500",
      completedColor: "#008000",
      delayedColor: "#FF0000",
      milestones: [],
    });
    setErrorData({});
    navigate("/");
  };

  const submitForm = () => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    if (validate()) {
      let data = {
        id: randomNumber,
        ...formData,
      };
      console.log(formData);
      setTemplateData((prev) => [...prev, data]);
      navigate("/");
    }
  };

  console.log(templateData, "templateData");

  return (
    <>
      <ToastContainer />
      <Modal ref={modalRef}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 30px",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              fontFamily: "poppins",
            }}
          >
            Add new milestone
          </Typography>

          <CloseIcon
            onClick={handleModalClose}
            sx={{
              cursor: "pointer",
              padding: "7px",
              borderRadius: "6px",
              background: "rgba(196,196,196,0.31)",
              display: "fit-content",
              fontSize: "28px",
            }}
          />
        </Box>
        <Box
          component={"form"}
          sx={{
            pt: "30px",
            pb: "50px",
            px: "30px",
          }}
        >
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
            Milestone name <span>*</span>
          </Typography>
          <NormalTextField
            placeholder={"Please type"}
            value={newMilstoneValue}
            handleChange={(e) => setNewMilstoneValue(e.target.value)}
            error={Boolean(errorData.newMilstoneValue)}
            helperText={errorData.newMilstoneValue}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "30px",
            }}
          >
            <Button
              onClick={handleModalClose}
              sx={{
                background: "#fff",
                fontSize: "12px",
                color: "#263032",
                border: "1px solid #E8E9EB",
                transition: "0.5s ease",
                height: "40px",
                width: "fit-content",
                paddingX: "32px",
                borderRadius: "8px",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#000080",
                  color: "#fff",
                  border: "1px solid rgba(0,0,128,0.4)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddNewMilestone}
              type="submit"
              sx={{
                background: "#000080",
                fontSize: "12px",
                color: "#fff",
                border: "1px solid rgba(0,0,128,0.4)",
                transition: "0.5s ease",
                height: "40px",
                width: "fit-content",
                paddingX: "32px",
                borderRadius: "8px",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#fff",
                  color: "#263032",
                  border: "1px solid #E8E9EB",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          maxHeight: "calc(100vh - 66px)",
          overflowY: "scroll",
          width: "calc(100vw - 77px)",
        }}
      >
        <Box
          sx={{
            px: "15px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              mt: "40px",
              mb: "25px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Add templates
          </Typography>
          <Box
            sx={{
              padding: "40px",
              pb: "20px",
              borderRadius: "6px",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr ",
                gap: "20px",
              }}
            >
              <Box sx={{}}>
                <Typography
                  sx={{
                    color: "#263032",
                    fontSize: "12px",
                    mb: "10px",
                    "& span": {
                      color: "#FF0000",
                    },
                  }}
                >
                  Template type <span>*</span>
                </Typography>
                <SelectFieldWithLabel
                  label={"Select"}
                  handleChange={handleChange}
                  name={"templateType"}
                  optionList={templateOptions}
                  error={Boolean(errorData.templateType)}
                  helperText={errorData.templateType}
                />
              </Box>

              <Box sx={{}}>
                <Typography
                  sx={{
                    color: "#263032",
                    fontSize: "12px",
                    mb: "10px",
                    "& span": {
                      color: "#FF0000",
                    },
                  }}
                >
                  Template name <span>*</span>
                </Typography>
                <NormalTextField
                  handleChange={handleChange}
                  name={"templateName"}
                  placeholder={"Please select"}
                  removeFocusedBorder={true}
                  error={Boolean(errorData.templateName)}
                  helperText={errorData.templateName}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                color: "#263032",
                fontSize: "14px",
                fontWeight: "500",
                mt: "20px",
                mb: "16px",
              }}
            >
              Colours
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
              }}
            >
              <ColorPicker
                label={"Progressing colour"}
                id={"progress"}
                value={formData.progressionColor}
                name="progressionColor"
                handleChange={handleChange}
              />
              <ColorPicker
                label={"Completed colour"}
                id={"completed"}
                value={formData.completedColor}
                name="completedColor"
                handleChange={handleChange}
              />
              <ColorPicker
                label={"Delayed colour"}
                value={formData.delayedColor}
                id={"delayed"}
                name="delayedColor"
                handleChange={handleChange}
              />
            </Box>
            {/* milestones */}
            <Box
              sx={{
                padding: "20px",
                background: "#F7F7F7",
                mt: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    maxWidth: "calc(100% - 200px)",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#263032",
                        mb: "8px",
                        "& span": {
                          color: "#FF0000",
                        },
                      }}
                    >
                      Milestone name <span>*</span>
                    </Typography>
                    <AutoCompleteSelectField
                      handleAddnewButton={handleModalOpen}
                      handleChange={handleTaskChanges}
                      name={"milestoneName"}
                      optionList={mileStonesListed}
                      value={tasks.milestoneName}
                      error={Boolean(errorData.milestoneName)}
                      helperText={errorData.milestoneName}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#263032",
                        mb: "8px",
                        "& span": {
                          color: "#FF0000",
                        },
                      }}
                    >
                      Task name <span>*</span>
                    </Typography>
                    <NormalTextField
                      placeholder={"Please type task name"}
                      removeFocusedBorder={true}
                      handleChange={handleTaskChanges}
                      name={"TaskName"}
                      value={tasks.TaskName}
                      error={Boolean(errorData.TaskName)}
                      helperText={errorData.TaskName}
                    />
                  </Box>
                </Box>
                <Button
                  onClick={handleSelectedTasks}
                  sx={{
                    background: "rgba(0,0,128,0.6)",
                    fontSize: "12px",
                    color: "#fff",
                    border: "1px solid #F7F7F7",
                    transition: "0.5s ease",
                    height: "40px",
                    width: "118px",
                    "&:hover": {
                      background: "#ffff",
                      color: "rgba(0,0,128,0.4)",
                      border: "1px solid rgba(0,0,128,0.4)",
                    },
                  }}
                >
                  Add task
                </Button>
              </Box>
              <Box
                sx={{
                  maxWidth: "calc(100% - 200px)",
                  mt: "20px",
                  display: "grid",
                  gap: "5px",
                }}
              >
                {selectedTasks?.TaskName?.map((tsk, idx) => (
                  <Box
                    sx={{
                      border: "1px solid #EFEFEF",
                      bgcolor: "#fff",
                      borderRadius: "4px",
                      padding: "10px 8px",
                      pr: "16px",
                      mx: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "7px",
                          color: "#fff",
                          bgcolor: "#000080",
                          fontSize: "12px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#263032",
                          lineHeight: "18px",
                        }}
                      >
                        {tsk}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <DeleteIcon />
                      <EditIcon />
                      <ViewIcon />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {errorData.selectedTasksTaskName && (
              <FormHelperText
                sx={{ ml: "10px", color: "red", fontSize: "10px" }}
              >
                {errorData.selectedTasksTaskName}
              </FormHelperText>
            )}
            <Box
              sx={{
                pb: "40px",
                borderBottom: "1px solid #E5E5E5",
              }}
            >
              <Box
                sx={{
                  textAlign: "right",
                }}
              >
                <Button
                  sx={{
                    background: "#fff",
                    fontSize: "12px",
                    color: "#000080",
                    border: "1px solid #000080",
                    transition: "0.5s ease",
                    height: "40px",
                    width: "fit-content",
                    paddingX: "32px",
                    borderRadius: "8px",
                    mt: "16px",
                    marginRight: "0",
                    ml: "auto",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#000080",
                      color: "#fff",
                      border: "1px solid rgba(0,0,128,0.4)",
                    },
                  }}
                  onClick={handleAddMileStones}
                >
                  Save/Add new milestone
                </Button>
              </Box>
              <Box sx={{ mt: "16px", display: "grid", gap: "10px" }}>
                {formData.milestones.map((mstn, i) => (
                  <Box
                    key={i}
                    sx={{
                      backgroundColor: "#fff",
                      filter: "drop-shadow(2px 2px 10px #59667a8f)",
                      padding: "16px 20px 20px",
                      borderRadius: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        gap: "12px",
                      }}
                    >
                      <DeleteIcon />
                      <EditIcon />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px", lineHeight: "18px" }}>
                        Milestone name :
                      </Typography>
                      <Button
                        sx={{
                          background: "#fff",
                          fontSize: "12px",
                          color: "#000080",
                          border: "1px solid #000080",
                          transition: "0.5s ease",
                          height: "27px",
                          width: "fit-content",
                          padding: "4px 10px ",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          "& svg path": {
                            transition: "0.5s ease",
                          },
                          "&:hover svg path": {
                            fill: "#fff",
                          },
                          "&:hover": {
                            background: "#000080",
                            color: "#fff",
                            border: "1px solid rgba(0,0,128,0.4)",
                          },
                        }}
                      >
                        <Star /> {mstn.milestoneName}
                      </Button>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "12px", lineHeight: "18px" }}>
                        Tasks :{" "}
                      </Typography>
                      <Box>
                        {mstn.TaskName.map((tsk, j) => (
                          <Box
                            key={j}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                              pt: "8px",
                            }}
                          >
                            <Box
                              sx={{
                                padding: "4px",
                                backgroundColor: "#F3F5F6",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                  color: "#fff",
                                  bgcolor: "#000080",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {j + 1}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#263032",
                                  lineHeight: "18px",
                                }}
                              >
                                {tsk}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {/* submit buttons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "20px",
                mb: "30px",
              }}
            >
              <Button
                onClick={cancelForm}
                sx={{
                  background: "#fff",
                  fontSize: "12px",
                  color: "#263032",
                  border: "1px solid #E8E9EB",
                  transition: "0.5s ease",
                  height: "40px",
                  width: "fit-content",
                  paddingX: "32px",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#000080",
                    color: "#fff",
                    border: "1px solid rgba(0,0,128,0.4)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  background: "#000080",
                  fontSize: "12px",
                  color: "#fff",
                  border: "1px solid rgba(0,0,128,0.4)",
                  transition: "0.5s ease",
                  height: "40px",
                  width: "fit-content",
                  paddingX: "32px",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#fff",
                    color: "#263032",
                    border: "1px solid #E8E9EB",
                  },
                }}
                onClick={submitForm}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddTemplateMain;
