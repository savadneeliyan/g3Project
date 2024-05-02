import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TemplateTable from "./TemplateTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { templateFindAllAction } from "../../../Redux/Action/ThemeAction";

function TemplatesMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get template data
  let { templateListFindAllSuccess } = useSelector((state) => {
    return state.findTemplateList;
  });

  // set template data
  useEffect(() => {
    if (templateListFindAllSuccess) {
      setData(templateListFindAllSuccess);
    }
  }, [templateListFindAllSuccess]);

  useEffect(() => {
    dispatch(templateFindAllAction());
  }, [dispatch]);

  const [data, setData] = useState();

  // handle search field
  const handleSearchChange = (e) => {
    let value = e.target.value;
    setData(
      templateListFindAllSuccess?.filter((item) =>
        item.template_name.includes(value)
      )
    );
  };

  return (
    <Box>
      <Box
        sx={{
          mt: "2.5rem",
          mb: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          Templates
        </Typography>
        <Button
          sx={{
            px: "1.75rem",
            py: "0.375rem",
            color: "#000080",
            border: "0.063rem solid #000080",
            borderRadius: "3.125rem",
            fontWeight: "500",
            fontSize: "0.75rem",
            textTransform: "initial",
          }}
          onClick={() => navigate(`/add-templates`)}
        >
          + Add new
        </Button>
      </Box>

      <Box
        sx={{
          padding: "1.563rem",
          borderRadius: "0.375rem",
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              border: "0.063rem solid #EFEFEF",
              borderRadius: "1.25rem",
              padding: "0.125rem",
              maxWidth: "17rem",
              overflow: "hidden",
              pl: "1rem",
              mb: "1.25rem",
              "& input": {
                outline: "none",
                border: "none",
                width: "calc(100% - 1.625rem)",
              },
            }}
          >
            <input placeholder="Search..." onChange={handleSearchChange} />
            <Box
              sx={{
                width: "1.625rem",
                height: "1.625rem",
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,128,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.81197 9.66451C7.72863 10.5301 6.35498 10.9481 4.97313 10.8325C3.59129 10.7169 2.30615 10.0765 1.38167 9.04295C0.457183 8.00936 -0.0364681 6.66099 0.00210114 5.27477C0.0406704 3.88856 0.608532 2.56973 1.58906 1.58915C2.56958 0.608567 3.88833 0.0406727 5.27447 0.00210126C6.6606 -0.0364702 8.00889 0.457209 9.04243 1.38175C10.076 2.30628 10.7163 3.59149 10.8319 4.97342C10.9474 6.35534 10.5295 7.72908 9.66396 8.81248L13.8081 12.9561C13.8674 13.0113 13.9149 13.0778 13.9478 13.1518C13.9808 13.2257 13.9985 13.3056 13.9999 13.3865C14.0013 13.4675 13.9864 13.5479 13.9561 13.6229C13.9258 13.698 13.8807 13.7662 13.8234 13.8234C13.7662 13.8807 13.698 13.9258 13.6229 13.9561C13.5479 13.9864 13.4675 14.0013 13.3865 13.9999C13.3056 13.9985 13.2258 13.9808 13.1518 13.9478C13.0779 13.9149 13.0113 13.8674 12.9562 13.8081L8.81197 9.66451ZM2.44138 8.40897C1.85146 7.81895 1.44967 7.06728 1.28679 6.24896C1.12392 5.43064 1.20727 4.5824 1.52631 3.81145C1.84536 3.04049 2.38577 2.38142 3.07926 1.91752C3.77274 1.45363 4.58817 1.20574 5.4225 1.20518C6.25682 1.20461 7.07259 1.45141 7.7667 1.91437C8.46081 2.37733 9.00211 3.03567 9.32219 3.8062C9.64227 4.57673 9.72676 5.42485 9.56499 6.24339C9.40322 7.06193 9.00244 7.81414 8.41331 8.40495L8.40929 8.40897L8.40527 8.41218C7.61364 9.20202 6.54089 9.64533 5.42266 9.64472C4.30443 9.64412 3.23216 9.19966 2.44138 8.40897Z"
                  fill="#000080"
                />
              </svg>
            </Box>
          </Box>
          <TemplateTable data={data} />
        </Box>
      </Box>
    </Box>
  );
}

export default TemplatesMain;
