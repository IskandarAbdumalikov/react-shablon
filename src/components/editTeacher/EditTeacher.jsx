import React from "react";
import "./editTecher.scss";
import axios from "axios";

const EditTeacher = ({ setEditData, data, setMaritalStatus }) => {
  function handleEditProduct(e) {
    e.preventDefault();
    let updateProduct = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
    axios
      .put(
        `https://6645a471b8925626f892813d.mockapi.io/school/teachers/${data.id}`,
        updateProduct
      )
      .then((res) => {
        setEditData(null);
        console.log(res);
        setMaritalStatus("all")
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div onClick={() => setEditData(null)} className="overlay"></div>
      <form onSubmit={handleEditProduct} action="" className="edit__module">
        <input
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
          value={data.firstName}
          type="text"
        />
        <input
          required
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          value={data.lastName}
          type="text"
        />
        <input
          required
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, email: e.target.value }))
          }
          value={data.email}
          type="text"
        />
        <input
          required
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          value={data.phoneNumber}
          type="text"
        />
        <button>Save</button>
        <h1 onClick={() => setEditData(null)} className="close__module-btn">
          X
        </h1>
      </form>
    </>
  );
};

export default EditTeacher;
