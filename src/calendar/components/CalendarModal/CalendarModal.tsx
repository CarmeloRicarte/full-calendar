import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./CalendarModal.scss";
import "react-datepicker/dist/react-datepicker.css";
import { ICalendarEvent } from "../../interfaces";
import { useCalendarStore, useUiStore } from "../../../hooks";
import { getEnvVariables } from "../../../helpers";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (getEnvVariables().VITE_MODE !== "test") {
  Modal.setAppElement("#root");
}

const formData: ICalendarEvent = {
  id: new Date().getTime().toString(),
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
};

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<ICalendarEvent>(formData);

  /* get the class for title input */
  const titleClass = useMemo(() => {
    if (!formSubmitted) {
      return "";
    }

    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    activeEvent && setFormValues({ ...activeEvent });
  }, [activeEvent]);

  /**
   * It closes the modal
   */
  const onCloseModal = () => {
    closeDateModal();
  };

  /**
   * We're using the spread operator to copy the existing formValues object, and then we're using the
   * computed property syntax to set the value of the property that matches the name of the input that
   * was changed
   * @param  - {
   */
  const onInputChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        "Fechas incorrectas",
        "Revise las fechas introducidas",
        "error"
      );
      return;
    }

    if (formValues.title.length <= 0) return;
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  /**
   * OnDateChange is a function that takes a date and a string, and set the date in formState wheh date * changes.
   * @param {Date} date - The date that was selected
   * @param {"start" | "end"} changing - "start" | "end"
   */
  const onDateChange = (date: Date, changing: "start" | "end") => {
    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {activeEvent?.id ? "Editar" : "Nuevo"} evento </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            locale="es"
            timeCaption="Hora"
            selected={formValues.start}
            className="form-control"
            onChange={(date: Date) => onDateChange(date, "start")}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            locale="es"
            timeCaption="Hora"
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(date: Date) => onDateChange(date, "end")}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="T??tulo del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripci??n corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Informaci??n adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
