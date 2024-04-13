import { createContext, useState } from "react";

export const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [templateData, setTemplateData] = useState([
    {
      id: "3211",
      progressionColor: "#5b3f0b",
      completedColor: "#1fc11f",
      delayedColor: "#8f2424",
      milestones: [
        {
          milestoneName: "ajhsbhjsadsddsaiydghasd",
          TaskName: ["dksjabd", "dsadasd", "dsadasd", "dsadsad"],
        },
        {
          milestoneName: "asdj",
          TaskName: ["dsad", "dasd"],
        },
      ],
      templateType: "installation",
      templateName: "cathedral installation template",
    },
    {
      id: "1233",
      progressionColor: "#9a7632",
      completedColor: "#a7b9a7",
      delayedColor: "#d56c6c",
      milestones: [
        {
          milestoneName: "shawshank",
          TaskName: ["task 1", "task 2"],
        },
        {
          milestoneName: "redumption",
          TaskName: ["dsknzz"],
        },
      ],
      templateType: "crane",
      templateName: "crane template",
    },
    {
      id: "1233",
      progressionColor: "#9a7632",
      completedColor: "#a7b9a7",
      delayedColor: "#d56c6c",
      milestones: [
        {
          milestoneName: "shawshank",
          TaskName: ["task 1", "task 2"],
        },
        {
          milestoneName: "redumption",
          TaskName: ["dsknzz"],
        },
      ],
      templateType: "installation",
      templateName: "installation template",
    },
  ]);

  return (
    <TemplateContext.Provider value={{ templateData, setTemplateData }}>
      {children}
    </TemplateContext.Provider>
  );
};
