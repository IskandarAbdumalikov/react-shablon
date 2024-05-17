import React, { useEffect, useState } from "react";
import "./teachers.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import checkImg from "../../assets/check.svg";
import errorImg from "../../assets/error.svg";
import EditTeacher from "../../components/editTeacher/EditTeacher";

let initialState = {
  firstName: "",
  lastName: "",
  avatar: "",
  isMarried: true,
  phoneNumber: "",
  email: "",
  vedio:
    "https://t3.ftcdn.net/jpg/02/68/64/28/360_F_268642811_GZ1DZLoeqG9v5Sp7XRfZteGm0BbdHSKN.jpg",
};

const Teacher = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [teachersCount, setTeachersCount] = useState(0);
  const [newTeacher, setNewTeacher] = useState(initialState);
  const [maritalStatus, setMaritalStatus] = useState("all");
  const [editData, setEditData] = useState(null);
  const LIMIT = 3;

  useEffect(() => {
    getTeachers();
  }, [page, maritalStatus, editData]);

  useEffect(() => {
    getTeachersCount();
  }, [maritalStatus]);

  function getTeachers() {
    let apiUrl = `https://6645a471b8925626f892813d.mockapi.io/school/teachers?limit=${LIMIT}&page=${page}`;

    if (maritalStatus !== "all") {
      apiUrl += `&isMarried=${maritalStatus === "married" ? "true" : "false"}`;
    }
    axios
      .get(apiUrl)
      .then((res) => {
        setData(res.data);
        getTeachersCount();
      })
      .catch((err) => console.log(err));
  }

  function getTeachersCount() {
    let apiUrl = `https://6645a471b8925626f892813d.mockapi.io/school/teachers`;

    if (maritalStatus !== "all") {
      apiUrl += `?isMarried=${maritalStatus === "married" ? "true" : "false"}`;
    }
    axios
      .get(apiUrl)
      .then((res) => setTeachersCount(res.data?.length))
      .catch((err) => console.log(err));
  }

  const handleDelete = (id) => {
    if (confirm("are you sure")) {
      axios
        .delete(
          `https://6645a471b8925626f892813d.mockapi.io/school/teachers/${id}`
        )
        .then(() => {
          getTeachers();
          getTeachersCount();
          alert("deleted");
        })
        .catch((err) => console.log(err));
    }
  };

  function getPages() {
    let res = [];
    for (let i = 1; i < teachersCount / LIMIT + 1; i++) {
      res.push(
        <button
          className={i === page ? "active" : "btn"}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return res;
  }
  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://6645a471b8925626f892813d.mockapi.io/school/teachers",
        newTeacher
      )
      .then((res) => {
        setNewTeacher(initialState);
        console.log(res);
        setShowModal(false);
        getTeachersCount();
      })
      .catch((err) => console.log(err));
  };

  let teacherItems = data?.map((card) => (
    <div key={card.id} className="teacher__card">
      <Link className="teacher__card__img" to={"/singlePage"}>
        <img src={card.avatar} alt="" />
      </Link>
      <div className="teacher__card__info">
        <h1>
          {card.firstName} {card.lastName}
        </h1>
        <h3>Email : {card.email}</h3>
        <h3>Phone Number : {card.phoneNumber}</h3>
        <h3 className="ismarried__checker">
          isMarried :{" "}
          {card.isMarried ? (
            <img width={20} src={checkImg} alt="" />
          ) : (
            <img width={20} src={errorImg} alt="" />
          )}
        </h3>
        <div className="teacher__card__btns">
          {/* <button>View Students</button> */}
          <button onClick={() => setEditData(card)} className="edit-btn">
            Edit
          </button>
          <button className="delete-btn" onClick={() => handleDelete(card.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="teachers">
      <div className="teachers__header  container">
        <div className="teachers__logo">LOGO</div>
        <select
          className="teachers__filter__select"
          name=""
          id=""
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
        <div className="teachers__header__btns">
          <button onClick={() => setShowModal(true)}>Add teacher</button>
        </div>
      </div>
      <div className="container teacher__wrapper">{teacherItems}</div>
      <div className="teachers__pagination">
        <button
          className={page === 1 ? "disabled" : ""}
          disabled={page === 1}
          onClick={() => setPage((prevPage) => prevPage - 1)}
        >
          prev
        </button>
        {getPages()}
        <button
          className={
            page === Math.ceil(teachersCount / LIMIT) ? "disabled" : ""
          }
          disabled={page === Math.ceil(teachersCount / LIMIT)}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          next
        </button>
      </div>
      <div
        onClick={() => setShowModal(false)}
        className={
          showModal ? "nav__overlay show__nav-overlay" : "nav__overlay"
        }
      ></div>
      {showModal ? (
        <div className="teacher__modal">
          <h1
            className="teacher__modal__closer"
            onClick={() => setShowModal(false)}
          >
            X
          </h1>
          <form onSubmit={handleCreate} className="teacher__form" action="">
            <input
              value={newTeacher.firstName}
              onChange={(e) =>
                setNewTeacher((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              placeholder="Enter first name"
              type="text"
            />
            <input
              value={newTeacher.avatar}
              onChange={(e) =>
                setNewTeacher((prev) => ({
                  ...prev,
                  avatar: e.target.value,
                }))
              }
              placeholder="Enter image url"
              type="text"
            />
            <input
              value={newTeacher.lastName}
              onChange={(e) =>
                setNewTeacher((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              placeholder="Enter last name"
              type="text"
            />
            <input
              value={newTeacher.phoneNumber}
              onChange={(e) =>
                setNewTeacher((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              placeholder="Enter phone number"
              type="text"
            />
            <input
              value={newTeacher.email}
              onChange={(e) =>
                setNewTeacher((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Enter email"
              type="gmail"
            />
            <input
              value={newTeacher.vedio}
              onChange={(e) =>
                setNewTeacher((prev) => ({
                  ...prev,
                  vedio: e.target.value,
                }))
              }
              placeholder="Enter video url"
              type="text"
            />
            <div className="isMarried">
              <div className="married">
                <label htmlFor="">Married</label>
                <input
                  onChange={(e) =>
                    setNewTeacher((prev) => ({
                      ...prev,
                      isMarried: e.target.value,
                    }))
                  }
                  value={newTeacher.isMarried}
                  type="radio"
                  name="gender"
                  id=""
                />
              </div>
              <div className="single">
                <label htmlFor="">Single</label>
                <input
                  onChange={(e) =>
                    setNewTeacher((prev) => ({
                      ...prev,
                      isMarried: e.target.value,
                    }))
                  }
                  value={newTeacher.isMarried}
                  type="radio"
                  name="gender"
                  id=""
                />
              </div>
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      ) : (
        <></>
      )}
      {editData ? (
        <EditTeacher
          setMaritalStatus={setMaritalStatus}
          data={editData}
          setEditData={setEditData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Teacher;
