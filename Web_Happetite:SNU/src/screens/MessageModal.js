import React, { useState } from "react";

const MessageModal = ({ message, onClose }) => {
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyData, setSurveyData] = useState({});
  const [questions, setQuestions] = useState([
    {
      step: 1,
      question: "신고 사유?",
      options: ["A", "B", "C"],
    },
    {
      step: 2,
      question: "정말 신고하시겠습니까?",
      options: ["Yes", "No",],
    },
  ]);

  const handleOptionSelect = (option) => {
    const currentStepData = { ...surveyData, [`step${surveyStep}`]: option };
    setSurveyData(currentStepData);

    // Advance to the next step if available
    if (surveyStep < questions.length) {
      setSurveyStep(surveyStep + 1);
    } else {
      // Process the final data or close the modal
      console.log("Survey data submitted:", surveyData);
      onClose();
    }
  };

  const currentQuestion = questions.find((q) => q.step === surveyStep);

  return (
    <div className="message-modal">
      <div className="modal-content">
        <p>{message.text}</p>
        <p>Sender: {message.sender}</p>
        {currentQuestion && (
          <div>
            <p>{currentQuestion.question}</p>
            <div className="options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;

