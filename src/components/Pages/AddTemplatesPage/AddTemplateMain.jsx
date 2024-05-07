import { Box, Button, FormHelperText, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
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
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import {
  milestoneFindAllAction,
  getColorAction,
  templateTypeFindAction,
  addNewMilestoneAction,
  formSubmitAction,
} from "../../../Redux/Action/ThemeAction";

function AddTemplateMain() {
  const navigate = useNavigate();
  const modalRef = useRef();
  const dispatch = useDispatch();

  let isUserExist = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  // get milestone data
  let { milestoneFindAllSuccess } = useSelector((state) => {
    return state.getMileStone;
  });

  // add milestone data
  let { addNewMilestoneSuccess } = useSelector((state) => {
    return state.addMileStone;
  });

  // get template type data
  let { getTemplateTypeSuccess } = useSelector((state) => {
    return state.TemplateTypeFind;
  });

  // get template type data
  let { getColorSuccess } = useSelector((state) => {
    return state.getColor;
  });

  // submit form
  let { submitFormSuccess } = useSelector((state) => {
    return state.submitForm;
  });

  useEffect(() => {
    dispatch(milestoneFindAllAction());
  }, [addNewMilestoneSuccess]);

  useEffect(() => {
    dispatch(templateTypeFindAction());
    dispatch(getColorAction());
  }, []);

  // milestone
  useEffect(() => {
    if (milestoneFindAllSuccess) {
      setMileStonesListed(milestoneFindAllSuccess);
    }
  }, [milestoneFindAllSuccess]);

  useEffect(() => {
    if (addNewMilestoneSuccess) {
      setNewMilstoneValue("");
      handleModalClose();
    }
  }, [addNewMilestoneSuccess]);

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
        ["colours"]: getColorSuccess,
      }));
    }
  }, [getColorSuccess]);

  // submit form
  useEffect(() => {
    if (submitFormSuccess) {
      setFormData({
        id:0,
        company_id: isUserExist.company.id,
        user_id: isUserExist.user.id,
        colours: [],
        milestone: [],
      });
      navigate("/");
    }
  }, [submitFormSuccess]);

  let [templateOptions, setTemplateOption] = useState([]);

  // states --------------------------------

  const [formData, setFormData] = useState({
    id:0,
    company_id: isUserExist.company.id,
    user_id: isUserExist.user.id,
    colours: [],
    milestone: [],
  });

  // milestone states --------------------------------
  const [mileStonesListed, setMileStonesListed] = useState([]);
  const [newMilstoneValue, setNewMilstoneValue] = useState("");
  const [taskList, setTasks] = useState({
    id: "",
    milestone_name: "",
    tasks: {},
  });

  const [errorData, setErrorData] = useState({});
  const [selectedTasks, setSelectedTasks] = useState({
    id: "",
    milestone_name: "",
    tasks: [],
  });

  // for seting formdata on input change --------------------------------
  const handleColorChange = (e, id) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      colours: prev.colours.map((item) =>
        item.id === id ? { ...item, color: value } : item
      ),
    }));
    setErrorData((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
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
    // console.log(taskList);
    const { value, name } = e.target;
    let item = {
      task_id: 0,
      name: value,
      display_index: 0,
    };
    setTasks((prev) => ({
      ...prev,
      [name]: item,
    }));
    setErrorData((prev) => ({
      ...prev,
      ["tasks"]: "",
    }));
  };

  const milestoneRepeatCheck = (name) => {
    const errors = {};

    if (formData?.milestone.some((item) => item.milestone_name === name)) {
      errors.milestoneName = "This milestone is unique under the template.";
    }
    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTaskMilestoneChanges = (value) => {
    if (milestoneRepeatCheck(value.name)) {
      setTasks(() => ({
        id: value.id,
        milestone_name: value.name,
        tasks: {},
      }));
      setErrorData((prev) => ({
        ...prev,
        ["milestoneName"]: "",
      }));

      setSelectedTasks({
        id: "",
        milestone_name: "",
        tasks: [],
      });
    }
  };

  const handleSelectedTasks = () => {
    if (taskValidate()) {
      setSelectedTasks((prev) => ({
        id: taskList.id,
        milestone_name: taskList.milestone_name,
        display_index: 0,
        tasks: [...prev.tasks, taskList.tasks],
      }));

      setTasks((prev) => ({
        ...prev,
        tasks: {},
      }));
    }
  };

  const handelAddedTask = (idx) => {
    let newArray = selectedTasks.tasks.filter((task, index) => index !== idx);
    setSelectedTasks((prev) => ({
      ...prev,
      ["tasks"]: newArray,
    }));
  };

  // add milestones operations --------------------------------

  const handleAddMileStones = () => {
    if (MileStoneValidate()) {
      setFormData((prev) => ({
        ...prev,
        milestone: [...prev.milestone, selectedTasks],
      }));
      setTasks({ id: "", milestone_name: "", tasks: {} });
      setSelectedTasks({
        id: "",
        milestone_name: "",
        tasks: [],
      });
    }
  };

  const handleAddNewMilestone = (e) => {
    e.preventDefault();
    if (NewMileStoneValidate()) {
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
      let data = {
        company_id: formData.company_id,
        name: newMilstoneValue,
      };
      dispatch(addNewMilestoneAction(data));
    }
  };

  const deleteSelectedMilestone = (idx) => {
    let newArray = formData.milestone.filter((task, index) => index !== idx);
    setFormData((prev) => ({
      ...prev,
      ["milestone"]: newArray,
    }));
  };

  // validations operations --------------------------------

  const MileStoneValidate = () => {
    const errors = {};
    let validate = true;

    if (selectedTasks.tasks.length === 0) {
      errors.selectedTasksTaskName = "Add any tasks to save milestone";
      validate = false;
    }
    setErrorData(errors);
    return validate;
  };

  const NewMileStoneValidate = () => {
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

    if (taskList.milestone_name.trim() === "") {
      errors.milestoneName = "Milestone name is required";
    }

    if (Object.keys(taskList.tasks).length === 0) {
      errors.tasks = "Task name is required";
    }

    if (
      selectedTasks?.tasks.some((item) => item.name === taskList.tasks.name)
    ) {
      errors.tasks = "This task is unique under this milestone.";
    }

    // console.log(errors, "errors");
    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

  const validate = () => {
    const errors = {};

    if (!formData.template_type) {
      errors.template_type = "Template type is required";
    }

    if (!formData.template_name) {
      errors.template_name = "Template name is required";
    }

    if (formData?.milestone?.length === 0) {
      errors.selectedTasksTaskName = "Add any tasks to save milestone";
    }
    formData.colours.forEach((item) => {
      if (!item.color) {
        errors[item.name] = `${item.name} color is required`;
      }
    });

    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

  // submit or cancel form operations --------------------------------

  const cancelForm = () => {
    setFormData({
      id:0,
      company_id: isUserExist.company.id,
      user_id: isUserExist.user.id,
      colours: [],
      milestone: [],
    });
    setErrorData({});
    navigate("/");
  };

  const submitForm = () => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    if (validate()) {
      dispatch(formSubmitAction(formData));
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("index"));
    const newItems = [...selectedTasks?.tasks];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    setSelectedTasks((prev) => ({
      ...prev,
      tasks: newItems,
    }));
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
            handleChange={(e) => {
              setNewMilstoneValue(e.target.value);
              setErrorData((prev) => ({
                ...prev,
                ["newMilstoneValue"]: "",
              }));
            }}
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
            {/* colors */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.25rem",
              }}
            >
              {formData?.colours?.map((item) => (
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

                    <MilestoneInput
                      handleAddnewButton={handleModalOpen}
                      handleChange={handleTaskMilestoneChanges}
                      name={"milestoneName"}
                      optionList={mileStonesListed}
                      value={{
                        id: taskList.id,
                        name: taskList.milestone_name,
                      }}
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
                      name={"tasks"}
                      value={taskList?.tasks?.name ? taskList?.tasks?.name : ""}
                      error={Boolean(errorData.tasks)}
                      helperText={errorData.tasks}
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
                {selectedTasks?.tasks?.map((tsk, idx) => (
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
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
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
                        {tsk.name}
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
                {formData?.milestone?.map((mstn, i) => (
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
                        <Star /> {mstn.milestone_name}
                      </Button>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: "0.75rem", lineHeight: "1.125rem" }}
                      >
                        Tasks :{" "}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {mstn.tasks.map((tsk, j) => (
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
                                padding: "0.5rem",
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
                                {tsk.name}
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
