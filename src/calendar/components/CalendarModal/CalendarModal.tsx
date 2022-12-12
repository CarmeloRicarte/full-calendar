import { useState } from "react";
import Modal from "react-modal";
import { addHours } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "./CalendarModal.scss";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarEvent } from "../../interfaces";

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

Modal.setAppElement("#root");

const formData: CalendarEvent = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
};

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formValues, setFormValues] = useState<CalendarEvent>(formData);

  const onCloseModal = () => {
    setIsOpen(false);
  };

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

  const onDateChange = (date: Date, changing: "start" | "end") => {
    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
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
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
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
            Información adicional
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
