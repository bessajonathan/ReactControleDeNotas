import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as api from "../../api/apiService";

Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;
  const [gradeValue, setgradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setgradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setgradeValidation(validation);
    };

    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );

      return;
    }

    setErrorMessage("");
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id,
      newValue: gradeValue,
    };

    onSave(formData);
  };

  const handleGradeChange = (event) => {
    setgradeValue(+event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" value={student} readOnly></input>
            <label className="active" htmlFor="inputName">
              Nome do Aluno:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputSubject"
              type="text"
              value={subject}
              readOnly
            ></input>
            <label className="active" htmlFor="inputSubject">
              Disciplina:
            </label>
          </div>

          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly></input>
            <label className="active" htmlFor="inputType">
              Disciplina:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota :
            </label>
            <div style={styles.flexRow}>
              <button
                className="waves-effect waves-light btn"
                disabled={errorMessage.trim() !== ""}
              >
                Salvar
              </button>
              <span style={styles.errorMessage}>{errorMessage}</span>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignitens: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "40px",
  },

  errorMessage: {
    color: "red",
    fontWeight: "bold",
  },
};
