import { Box, Button, FormHelperText, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AutoCompleteSelectField,
  MilestoneInput,
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import {
  milestoneFindAllAction,
  getColorAction,
  templateTypeFindAction,
} from "../../../Redux/Action/ThemeAction";

function AddTemplateMain() {
  const { templateData, setTemplateData } = useContext(TemplateContext);
  const navigate = useNavigate();
  const modalRef = useRef();
  const dispatch = useDispatch();

  // get milestone data
  let { milestoneFindAllSuccess } = useSelector((state) => {
    return state.getMileStone;
  });

  // get template type data
  let { getTemplateTypeSuccess } = useSelector((state) => {
    return state.TemplateTypeFind;
  });

  // get template type data
  let { getColorSuccess } = useSelector((state) => {
    return state.getColor;
  });

  useEffect(() => {
    dispatch(milestoneFindAllAction());
    dispatch(templateTypeFindAction());
    dispatch(getColorAction());
  }, []);

  // milestone
  useEffect(() => {
    if (milestoneFindAllSuccess) {
      setMileStonesListed(milestoneFindAllSuccess);
    }
  }, [milestoneFindAllSuccess]);

  // template type
  useEffect(() => {
    if (getTemplateTypeSuccess) {
      setTemplateOption(getTemplateTypeSuccess);
    }
  }, [getTemplateTypeSuccess]);

  // color
  useEffect(() => {
    if (getColorSuccess) {
      setFormData((prev) => ({
        ...prev,
        ["colour"]: getColorSuccess,
      }));
    }
  }, [getColorSuccess]);

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

  let [templateOptions, setTemplateOption] = useState([]);

  // states --------------------------------

  const [formData, setFormData] = useState({
    colour: [],
    milestones: [],
  });
  // milestone states --------------------------------
  const [mileStonesListed, setMileStonesListed] = useState([]);
  const [newMilstoneValue, setNewMilstoneValue] = useState();
  const [tasks, setTasks] = useState({
    milestoneName: {},
    TaskName: "",
  });
  const [errorData, setErrorData] = useState({});
  const [selectedTasks, setSelectedTasks] = useState({
    milestoneName: {},
    TaskName: [],
  });

  // for seting formdata on input change --------------------------------
  const handleColorChange = (e, id) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      colour: prev.colour.map((item) =>
        item.id === id ? { ...item, color: value } : item
      ),
    }));
    setErrorData((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(name);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorData((prev) => ({
      ...prev,
      [name]: "",
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
    setTasks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskMilestoneChanges = (value) => {
    // console.log(value);
    setTasks(() => ({
      ["milestoneName"]: value,
      TaskName: "",
    }));
    setErrorData((prev) => ({
      ...prev,
      ["milestoneName"]: "",
    }));

    setSelectedTasks({
      milestoneName: {},
      TaskName: [],
    });
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

  const handelAddedTask = (idx) => {
    let newArray = selectedTasks.TaskName.filter(
      (task, index) => index !== idx
    );
    setSelectedTasks((prev) => ({
      ...prev,
      ["TaskName"]: newArray,
    }));
  };

  // add milestones operations --------------------------------

  const handleAddMileStones = () => {
    if (MileStoneValidate()) {
      setFormData((prev) => ({
        ...prev,
        milestones: [...prev.milestones, selectedTasks],
      }));
      setTasks({ milestoneName: {}, TaskName: "" });
      setSelectedTasks({
        milestoneName: {},
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

  const deleteSelectedMilestone = (idx) => {
    // console.log(formData.milestones);
    let newArray = formData.milestones.filter((task, index) => index !== idx);
    setFormData((prev) => ({
      ...prev,
      ["milestones"]: newArray,
    }));
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

    if (!newMilstoneValue.trim()) {
      errors.newMilstoneValue = "Milestone name is required";
    }

    // console.log(errors, "errors");
    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

  const taskValidate = () => {
    const errors = {};

    if (Object.keys(tasks.milestoneName).length === 0) {
      errors.milestoneName = "Milestone name is required";
    }

    if (!tasks.TaskName.trim()) {
      errors.TaskName = "Task name is required";
    }

    // console.log(errors, "errors");
    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

  const validate = () => {
    const errors = {};
    let validate = true;

    if (!formData.template_type) {
      errors.template_type = "Template type is required";
    }

    if (!formData.template_name) {
      errors.template_name = "Template name is required";
    }

    if (formData?.milestones?.length === 0) {
      errors.selectedTasksTaskName = "Add any tasks to save milestone";
    }
    formData.colour.forEach((item) => {
      if (!item.color) {
        errors[item.name] = `${item.name} color is required`;
      }
    });

    // if (!tasks.milestoneName.trim()) {
    //   errors.milestoneName = "Milestone name is required";
    // }

    // if (!tasks.TaskName.trim()) {
    //   errors.TaskName = "Task name is required";
    // }

    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

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
      // navigate("/");
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal ref={modalRef}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 1.875rem",
            borderBottom: "0.063rem solid #E5E5E5",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.125rem",
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
              padding: "0.438rem",
              borderRadius: "0.375rem",
              background: "rgba(196,196,196,0.31)",
              display: "fit-content",
              fontSize: "1.75rem",
            }}
          />
        </Box>
        <Box
          component={"form"}
          sx={{
            pt: "1.875rem",
            pb: "3.125rem",
            px: "1.875rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: "500",
              mb: "0.5rem",
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
              mt: "1.875rem",
            }}
          >
            <Button
              onClick={handleModalClose}
              sx={{
                background: "#fff",
                fontSize: "0.75rem",
                color: "#263032",
                border: "0.063rem solid #E8E9EB",
                transition: "0.5s ease",
                height: "2.5rem",
                width: "fit-content",
                paddingX: "2rem",
                borderRadius: "0.5rem",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#000080",
                  color: "#fff",
                  border: "0.063rem solid rgba(0,0,128,0.4)",
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
                fontSize: "0.75rem",
                color: "#fff",
                border: "0.063rem solid rgba(0,0,128,0.4)",
                transition: "0.5s ease",
                height: "2.5rem",
                width: "fit-content",
                paddingX: "2rem",
                borderRadius: "0.5rem",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#fff",
                  color: "#263032",
                  border: "0.063rem solid #E8E9EB",
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
          maxHeight: "calc(100vh - 4.125rem)",
          overflowY: "scroll",
          width: "calc(100vw - 4.813rem)",
        }}
      >
        <Box
          sx={{
            px: "0.938rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              mt: "2.5rem",
              mb: "1.563rem",
            }}
          >
            <KeyboardBackspaceIcon
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            />
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Add templates
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "2.5rem",
              pb: "1.25rem",
              borderRadius: "0.375rem",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr ",
                gap: "1.25rem",
              }}
            >
              <Box sx={{}}>
                <Typography
                  sx={{
                    color: "#263032",
                    fontSize: "0.75rem",
                    mb: "0.625rem",
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
                  name={"template_type"}
                  value={formData?.template_type}
                  optionList={templateOptions}
                  error={Boolean(errorData?.template_type)}
                  helperText={errorData?.template_type}
                  component={"template_type"}
                />
              </Box>

              <Box sx={{}}>
                <Typography
                  sx={{
                    color: "#263032",
                    fontSize: "0.75rem",
                    mb: "0.625rem",
                    "& span": {
                      color: "#FF0000",
                    },
                  }}
                >
                  Template name <span>*</span>
                </Typography>
                <NormalTextField
                  handleChange={handleChange}
                  name={"template_name"}
                  value={formData?.template_name}
                  placeholder={"Please select"}
                  removeFocusedBorder={true}
                  error={Boolean(errorData?.template_name)}
                  helperText={errorData?.template_name}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                color: "#263032",
                fontSize: "0.875rem",
                fontWeight: "500",
                mt: "1.25rem",
                mb: "1rem",
              }}
            >
              Colours
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.25rem",
              }}
            >
              {formData?.colour?.map((item) => (
                <div key={item.id}>
                  <ColorPicker
                    label={`${item.name} colour`}
                    id={item.name}
                    value={item.color}
                    name={item.name}
                    handleChange={(e) => handleColorChange(e, item.id)}
                    error={Boolean(errorData[item.name])}
                    helperText={errorData[item.name]}
                  />
                </div>
              ))}
            </Box>
            {/* <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.25rem",
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
            </Box> */}
            {/* milestones */}
            <Box
              sx={{
                padding: "1.25rem",
                background: "#F7F7F7",
                mt: "1.25rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "end",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                    maxWidth: "calc(100% - 12.5rem)",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#263032",
                        mb: "0.5rem",
                        "& span": {
                          color: "#FF0000",
                        },
                      }}
                    >
                      Milestone name <span>*</span>
                    </Typography>
                    {/* <AutoCompleteSelectField
                      handleAddnewButton={handleModalOpen}
                      handleChange={handleTaskChanges}
                      name={"milestoneName"}
                      optionList={mileStonesListed}
                      value={tasks.milestoneName}
                      error={Boolean(errorData.milestoneName)}
                      helperText={errorData.milestoneName}
                    /> */}
                    <MilestoneInput
                      handleAddnewButton={handleModalOpen}
                      handleChange={handleTaskMilestoneChanges}
                      name={"milestoneName"}
                      optionList={mileStonesListed}
                      value={tasks.milestoneName}
                      error={Boolean(errorData.milestoneName)}
                      helperText={errorData.milestoneName}
                      label={"Please type"}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#263032",
                        mb: "0.5rem",
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
                    fontSize: "0.75rem",
                    color: "#fff",
                    border: "0.063rem solid #F7F7F7",
                    transition: "0.5s ease",
                    height: "2.5rem",
                    width: "7.375rem",
                    padding: "0.375rem 0.5rem",
                    mt: "1.6rem",
                    "&:hover": {
                      background: "#ffff",
                      color: "rgba(0,0,128,0.4)",
                      border: "0.063rem solid rgba(0,0,128,0.4)",
                    },
                  }}
                >
                  Add task
                </Button>
              </Box>
              <Box
                sx={{
                  maxWidth: "calc(100% - 12.5rem)",
                  mt: "1.25rem",
                  display: "grid",
                  gap: "0.313rem",
                }}
              >
                {selectedTasks?.TaskName?.map((tsk, idx) => (
                  <Box
                    sx={{
                      border: "0.063rem solid #EFEFEF",
                      bgcolor: "#fff",
                      borderRadius: "0.25rem",
                      padding: "0.625rem 0.5rem",
                      pr: "1rem",
                      mx: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.25rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      <Box
                        sx={{
                          width: "1.875rem",
                          height: "1.875rem",
                          borderRadius: "0.438rem",
                          color: "#fff",
                          bgcolor: "#000080",
                          fontSize: "0.75rem",
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
                          fontSize: "0.75rem",
                          color: "#263032",
                          lineHeight: "1.125rem",
                        }}
                      >
                        {tsk}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <DeleteIcon handleClick={() => handelAddedTask(idx)} />
                      <EditIcon />
                      <ViewIcon />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {errorData.selectedTasksTaskName && (
              <FormHelperText
                sx={{ ml: "0.625rem", color: "red", fontSize: "0.625rem" }}
              >
                {errorData.selectedTasksTaskName}
              </FormHelperText>
            )}
            <Box
              sx={{
                pb: "2.5rem",
                borderBottom: "0.063rem solid #E5E5E5",
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
                    fontSize: "0.75rem",
                    color: "#000080",
                    border: "0.063rem solid #000080",
                    transition: "0.5s ease",
                    height: "2.5rem",
                    width: "fit-content",
                    paddingX: "2rem",
                    borderRadius: "0.5rem",
                    mt: "1rem",
                    marginRight: "0",
                    ml: "auto",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#000080",
                      color: "#fff",
                      border: "0.063rem solid rgba(0,0,128,0.4)",
                    },
                  }}
                  onClick={handleAddMileStones}
                >
                  Save/Add new milestone
                </Button>
              </Box>
              <Box
                sx={{
                  mt: "1rem",
                  display: "flex",
                  flexDirection: "column-reverse",
                  gap: "0.625rem",
                }}
              >
                {formData?.milestones?.map((mstn, i) => (
                  <Box
                    key={i}
                    sx={{
                      backgroundColor: "#fff",
                      filter:
                        "drop-shadow(0.125rem 0.125rem 0.625 rem #59667a8f)",
                      padding: "1rem 1.25rem 1.25rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        gap: "0.75rem",
                        "& svg": {
                          width: "0.5rem",
                          height: "0.5rem",
                        },
                      }}
                    >
                      <DeleteIcon
                        handleClick={() => deleteSelectedMilestone(i)}
                      />
                      <EditIcon />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.75rem", lineHeight: "1.125rem" }}
                      >
                        Milestone name :
                      </Typography>
                      <Button
                        sx={{
                          background: "#fff",
                          fontSize: "0.75rem",
                          color: "#000080",
                          border: "0.063rem solid #000080",
                          transition: "0.5s ease",
                          height: "1.688rem",
                          width: "fit-content",
                          padding: "0.25rem 0.625rem ",
                          borderRadius: "0.5rem",
                          textTransform: "capitalize",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.25rem",
                          "& svg path": {
                            transition: "0.5s ease",
                          },
                          "&:hover svg path": {
                            fill: "#fff",
                          },
                          "&:hover": {
                            background: "#000080",
                            color: "#fff",
                            border: "0.063rem solid rgba(0,0,128,0.4)",
                          },
                          "& svg": {
                            width: "0.438rem",
                            height: "0.438rem",
                          },
                        }}
                      >
                        <Star /> {mstn.milestoneName.name}
                      </Button>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "0.75rem", lineHeight: "1.125rem" }}
                      >
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
                              gap: "0.5rem",
                              pt: "0.5rem",
                            }}
                          >
                            <Box
                              sx={{
                                padding: "0.25rem",
                                backgroundColor: "#F3F5F6",
                                borderRadius: "0.375rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "1.875rem",
                                  height: "1.875rem",
                                  borderRadius: "50%",
                                  color: "#fff",
                                  bgcolor: "#000080",
                                  fontSize: "0.75rem",
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
                                  fontSize: "0.75rem",
                                  color: "#263032",
                                  lineHeight: "1.125rem",
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
                mt: "1.25rem",
                mb: "1.875rem",
              }}
            >
              <Button
                onClick={cancelForm}
                sx={{
                  background: "#fff",
                  fontSize: "0.75rem",
                  color: "#263032",
                  border: "0.063rem solid #E8E9EB",
                  transition: "0.5s ease",
                  height: "2.5rem",
                  width: "fit-content",
                  paddingX: "2rem",
                  borderRadius: "0.5rem",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#000080",
                    color: "#fff",
                    border: "0.063rem solid rgba(0,0,128,0.4)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  background: "#000080",
                  fontSize: "0.75rem",
                  color: "#fff",
                  border: "0.063rem solid rgba(0,0,128,0.4)",
                  transition: "0.5s ease",
                  height: "2.5rem",
                  width: "fit-content",
                  paddingX: "2rem",
                  borderRadius: "0.5rem",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#fff",
                    color: "#263032",
                    border: "0.063rem solid #E8E9EB",
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
