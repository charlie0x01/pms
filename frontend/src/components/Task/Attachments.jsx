import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";

// files icons
import word_icon from "../../assets/Icons/Word-icon.png";
import pdf_icon from "../../assets/Icons/pdf-icon.png";
import document_icon from "../../assets/Icons/Document-icon.png";

// apis
import {
  useGetAttachmentsQuery,
  useDeleteAttachmentMutation,
  useUploadAttchmentMutation,
} from "../../apis/taskApi";

const Attachments = ({ taskId }) => {
  const [files, setfiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  ////
  const [messageApi, contextHandler] = message.useMessage();

  // get attachments
  const { data: attachments } = useGetAttachmentsQuery(taskId);

  // delete attachment
  const [
    deleteAttachment,
    { isLoading, isError, isSuccess, error, data: deleteResponse },
  ] = useDeleteAttachmentMutation();

  const [uploadAttchment] = useUploadAttchmentMutation();

  const handleFileChange = (event) => {
    setfiles(event.target.files);
    setSelectedFiles([...event.target.files]);
  };

  const handleAttachments = async () => {
    const formData = new FormData();

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    } else {
      return messageApi.error("No File Selected");
    }
    // formData.append("file", files);
    formData.append("taskId", taskId);

    uploadAttchment(formData)
      .unwrap()
      .then((response) => {
        messageApi.success("File uploaded successfully");
        handleClearAllSelection();
        // Handle the response as needed
      })
      .catch((error) => {
        messageApi.error("Error uploading file: ", error);
        // Handle the error as needed
      });

    // await axios
    //   .post("http://localhost:5000/upload/attachments", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((response) => {
    //     messageApi.success("File uploaded successfully");
    //
    //   })
    //   .catch((error) => {
    //     messageApi.error("Error uploading file: ", error);
    //   });
  };

  const handleClearAllSelection = () => {
    setfiles([]);
    setSelectedFiles([]);
  };

  const handleDeleteFile = (taskId, file) => {
    deleteAttachment({ taskId: taskId, attachment: file });
  };

  const getFileIcon = (originalname) => {
    const extension = originalname.split(".").pop().toLowerCase();

    if (extension === "pdf") {
      return pdf_icon;
    } else if (extension === "doc" || extension === "docx") {
      return word_icon;
    } else {
      return document_icon;
    }
  };

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error?.data.error)) {
        error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error?.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(deleteResponse?.message);
    }
  }, [isLoading]);

  return (
    <>
      {contextHandler}
      <div className="is-flex is-gap-2 ">
        <div class="file">
          <label class="file-label">
            <input
              multiple
              accept="application/pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              class="file-input"
              type="file"
              onChange={handleFileChange}
            />
            <span class="file-cta">
              <span class="file-icon">
                <FaUpload />
              </span>
              <span class="file-label">Choose a file…</span>
            </span>
          </label>
        </div>
        <button className="button is-primary" onClick={handleAttachments}>
          Upload
        </button>
      </div>
      <div className="mt-3">
        {selectedFiles.length > 0 && (
          <div>
            <h2>Selected Files:</h2>
            <div className="is-flex is-gap-1 mt-2 is-flex-wrap-wrap">
              {selectedFiles.map((file) => (
                <div
                  className="box p-2 is-flex is-align-items-center is-gap-1"
                  style={{
                    // maxWidth: 150,
                    maxHeight: 40,
                    margin: 0,
                    border: "1px solid hsl(0, 0%, 86%)",
                  }}
                >
                  <div>
                    <figure class="image is-24x24">
                      <img src={getFileIcon(file.name)} />
                    </figure>
                  </div>
                  <p className="ellipsis-single">{file.name}</p>
                </div>
              ))}
              <button onClick={handleClearAllSelection} className="button">
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h1 className="subtitle is-size-6">Attached Files:</h1>
        <div className="is-flex is-gap-1 mt-2 is-flex-wrap-wrap">
          {attachments && (
            <>
              {attachments?.data.map((file, index) => (
                <div
                  key={index}
                  className="box p-2 is-flex is-align-items-center is-gap-1"
                  style={{
                    // maxWidth: 150,
                    maxHeight: 40,
                    margin: 0,
                    border: "1px solid hsl(0, 0%, 86%)",
                  }}
                >
                  <div>
                    <figure class="image is-24x24">
                      <img
                        src={getFileIcon(file.attachment_path.split(".").pop())}
                      />
                    </figure>
                  </div>
                  <a href={file.attachment_path} className="ellipsis-single">
                    {file.attachment_path.split("/").pop()}
                  </a>
                  <button
                    onClick={() =>
                      handleDeleteFile(taskId, file.attachment_path)
                    }
                    className="delete is-small"
                  ></button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Attachments;
