import React, { useState } from "react";
import Modal from "../common/Modal";

const TaskForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal show={isOpen}>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        class="modal-close is-large"
        aria-label="close"
      ></button>
      {/* body!!! */}
      <div className="p-3">
        <h1 className="title is-size-5 has-text-centered has-text-grey">Add a new task</h1>
        <form>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Task Title</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter Task Title"
                  />
                </div>
                {/* <p class="help is-danger">This field is required</p> */}
              </div>
            </div>
          </div>
          {/* {formik.touched.projectName && formik.errors.projectName ? (
          <div className="has-text-danger">{formik.errors.projectName}</div>
        ) : null} */}
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Priority</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>
                      <option>Business development</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Due Date</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <input
                    class="input"
                    type="date"
                    placeholder="Enter Task Title"
                  />
                </div>
                {/* <p class="help is-danger">This field is required</p> */}
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Description</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea
                    class="input"
                    type="date"
                    placeholder="Enter Task Title"
                    rows={5}
                    cols={5}
                  />
                </div>
                {/* <p class="help is-danger">This field is required</p> */}
              </div>
            </div>
          </div>
          <button type="submit" className="button is-primary">
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default TaskForm;
