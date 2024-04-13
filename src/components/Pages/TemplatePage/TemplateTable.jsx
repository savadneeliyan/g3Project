import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function TemplateTable({ data }) {
  const navigate = useNavigate()
  const Counter = () => (
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5875 5.09091L2.5 6.89047L4.4125 5.09091L5 5.64764L2.5 8L0 5.64764L0.5875 5.09091Z"
        fill="#A2A6A7"
      />
      <path
        d="M0.5875 2.90909L2.5 1.11103L4.4125 2.90909L5 2.35554L2.5 0L0 2.35554L0.5875 2.90909Z"
        fill="#A2A6A7"
      />
    </svg>
  );
  return (
    <Box
      sx={{
        "& table": {
          width: "100%",
          border: "1px solid #E5E5E5",
        },
        "& tr": {
          textAlign: "left",
        },
      }}
    >
      {/* <table>
        <thead>
          <tr>
            <th>Template name</th>
            <th>Template type</th>
            <th>Created by</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Installation template</td>
            <td>Installation</td>
            <td>
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                >
                  <img src="https://images.pexels.com/photos/20432595/pexels-photo-20432595/free-photo-of-a-woman-with-glasses-on-smiling.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                </Box>
                <Typography sx={{ color: "#263032", fontSize: "12px" }}>
                  David Nowak
                </Typography>
              </Box>
            </td>
            <td>
              <Typography
                sx={{
                  padding: "4px 10px",
                  color: "#03C395",
                  backgroundColor: "#E0F7F2",
                  borderRadius: "6px",
                  width: "fit-content",
                  display: "block",
                }}
              >
                Active
              </Typography>
            </td>
            <td>
              {" "}
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8571 5C13.9524 3.63426 12.8185 2.61285 11.4554 1.93576C11.8185 2.53762 12 3.18866 12 3.88889C12 4.95949 11.6086 5.87529 10.8259 6.63628C10.0432 7.39728 9.10119 7.77778 8 7.77778C6.89881 7.77778 5.95685 7.39728 5.17411 6.63628C4.39137 5.87529 4 4.95949 4 3.88889C4 3.18866 4.18155 2.53762 4.54464 1.93576C3.18155 2.61285 2.04762 3.63426 1.14286 5C1.93452 6.18634 2.92708 7.13108 4.12054 7.8342C5.31399 8.53733 6.60714 8.88889 8 8.88889C9.39286 8.88889 10.686 8.53733 11.8795 7.8342C13.0729 7.13108 14.0655 6.18634 14.8571 5ZM8.42857 1.66667C8.42857 1.55093 8.3869 1.45255 8.30357 1.37153C8.22024 1.29051 8.11905 1.25 8 1.25C7.25595 1.25 6.61756 1.50897 6.08482 2.02691C5.55208 2.54485 5.28571 3.16551 5.28571 3.88889C5.28571 4.00463 5.32738 4.10301 5.41071 4.18403C5.49405 4.26505 5.59524 4.30556 5.71429 4.30556C5.83333 4.30556 5.93452 4.26505 6.01786 4.18403C6.10119 4.10301 6.14286 4.00463 6.14286 3.88889C6.14286 3.3912 6.32441 2.96586 6.6875 2.61285C7.0506 2.25984 7.4881 2.08333 8 2.08333C8.11905 2.08333 8.22024 2.04282 8.30357 1.96181C8.3869 1.88079 8.42857 1.78241 8.42857 1.66667ZM16 5C16 5.19676 15.9405 5.39641 15.8214 5.59896C14.9881 6.92998 13.8676 7.99624 12.4598 8.79774C11.0521 9.59925 9.56548 10 8 10C6.43452 10 4.94792 9.5978 3.54018 8.7934C2.13244 7.98901 1.0119 6.92419 0.178571 5.59896C0.0595238 5.39641 0 5.19676 0 5C0 4.80324 0.0595238 4.60359 0.178571 4.40104C1.0119 3.07581 2.13244 2.011 3.54018 1.2066C4.94792 0.402199 6.43452 0 8 0C9.56548 0 11.0521 0.402199 12.4598 1.2066C13.8676 2.011 14.9881 3.07581 15.8214 4.40104C15.9405 4.60359 16 4.80324 16 5Z"
                  fill="#000080"
                />
              </svg>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table> */}

      <TableContainer>
        <Table
          sx={{ minWidth: 700, border: "1px solid #D1D4D7" }}
          aria-label="customized table"
        >
          <TableHead
            sx={{
              "& th": {
                color: "#263032",
                fontWeight: "600",
                textAlign: "left",
              },
            }}
          >
            <TableRow sx={{}}>
              <TableCell>Template name</TableCell>
              <TableCell align="right">
                Template type <Counter />
              </TableCell>
              <TableCell align="right">
                Created by <Counter />
              </TableCell>
              <TableCell align="right">
                Status <Counter />
              </TableCell>
              <TableCell align="right">
                Actions <Counter />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td": {
                color: "#263032",
                textAlign: "left",
              },
            }}
          >
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#F9F9F9",
                  },
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.templateName}
                </TableCell>
                <TableCell align="right">{row.templateType}</TableCell>
                <TableCell align="right">
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        "& img": {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        },
                      }}
                    >
                      <img src="https://images.pexels.com/photos/20432595/pexels-photo-20432595/free-photo-of-a-woman-with-glasses-on-smiling.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                    </Box>
                    <Typography sx={{ color: "#263032", fontSize: "12px" }}>
                      David Nowak
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography
                    sx={{
                      padding: "4px 10px",
                      color: "#03C395",
                      backgroundColor: "#E0F7F2",
                      borderRadius: "6px",
                      width: "fit-content",
                      display: "block",
                    }}
                  >
                    Active
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <svg
                    onClick={() => navigate(`/edit-template/${row.id}`)}
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8571 5C13.9524 3.63426 12.8185 2.61285 11.4554 1.93576C11.8185 2.53762 12 3.18866 12 3.88889C12 4.95949 11.6086 5.87529 10.8259 6.63628C10.0432 7.39728 9.10119 7.77778 8 7.77778C6.89881 7.77778 5.95685 7.39728 5.17411 6.63628C4.39137 5.87529 4 4.95949 4 3.88889C4 3.18866 4.18155 2.53762 4.54464 1.93576C3.18155 2.61285 2.04762 3.63426 1.14286 5C1.93452 6.18634 2.92708 7.13108 4.12054 7.8342C5.31399 8.53733 6.60714 8.88889 8 8.88889C9.39286 8.88889 10.686 8.53733 11.8795 7.8342C13.0729 7.13108 14.0655 6.18634 14.8571 5ZM8.42857 1.66667C8.42857 1.55093 8.3869 1.45255 8.30357 1.37153C8.22024 1.29051 8.11905 1.25 8 1.25C7.25595 1.25 6.61756 1.50897 6.08482 2.02691C5.55208 2.54485 5.28571 3.16551 5.28571 3.88889C5.28571 4.00463 5.32738 4.10301 5.41071 4.18403C5.49405 4.26505 5.59524 4.30556 5.71429 4.30556C5.83333 4.30556 5.93452 4.26505 6.01786 4.18403C6.10119 4.10301 6.14286 4.00463 6.14286 3.88889C6.14286 3.3912 6.32441 2.96586 6.6875 2.61285C7.0506 2.25984 7.4881 2.08333 8 2.08333C8.11905 2.08333 8.22024 2.04282 8.30357 1.96181C8.3869 1.88079 8.42857 1.78241 8.42857 1.66667ZM16 5C16 5.19676 15.9405 5.39641 15.8214 5.59896C14.9881 6.92998 13.8676 7.99624 12.4598 8.79774C11.0521 9.59925 9.56548 10 8 10C6.43452 10 4.94792 9.5978 3.54018 8.7934C2.13244 7.98901 1.0119 6.92419 0.178571 5.59896C0.0595238 5.39641 0 5.19676 0 5C0 4.80324 0.0595238 4.60359 0.178571 4.40104C1.0119 3.07581 2.13244 2.011 3.54018 1.2066C4.94792 0.402199 6.43452 0 8 0C9.56548 0 11.0521 0.402199 12.4598 1.2066C13.8676 2.011 14.9881 3.07581 15.8214 4.40104C15.9405 4.60359 16 4.80324 16 5Z"
                      fill="#000080"
                    />
                  </svg>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Box>
  );
}

export default TemplateTable;