import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// apis


const UserRoles = () => {
  useEffect(() => {
    async function handleError() {
      if (isError) {
        if (Array.isArray(error.data.error)) {
          error.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(response?.message);
        await delay(1000);
        setIsOpen(false);
      }
    }

    handleError();
  }, [isLoading]);
  return (
    <form>
      <div class="field">
        <label class="label">Select Menu</label>
        <div class="control">
          <div class="select is-primary">
            <select {...formik.getFieldProps("orgId")}>
              <option>Select an option</option>

              {organizations?.length > 0 &&
                organizations?.map((org, index) => {
                  return (
                    <option value={org.org_id} key={index}>
                      {org.org_name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      {formik.touched.orgId && formik.errors.orgId ? (
        <div className="has-text-danger">{formik.errors.orgId}</div>
      ) : null}
    </form>
  );
};

export default UserRoles;
