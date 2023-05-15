import React from "react";

const ProjectProfile = () => {
  return (
    <section class="section">
      <div class="container">
        <h1 class="title">Project Profile</h1>
        <form>
          <div class="field is-flex is-align-items-center is-gap-3">
            <figure class="image is-128x128">
              <img
                className="is-rounded"
                src="https://gravatar.com/avatar/6cc732b7d567902fe51e24b0c909c97d?s=400&d=robohash&r=x"
              />
            </figure>
            <div class="control">
              <input class="input" type="file" />
            </div>
          </div>
          <div class="field">
            <label class="label">Project Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Website URL</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Enter a short bio about yourself"
              ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
      <div className="container mt-5">
        <div className="is-flex is-justify-content-space-between">
          <h1 className="title">Members</h1>
          <button className="button">Add New Member</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectProfile;
