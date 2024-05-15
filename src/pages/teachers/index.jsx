import React, { useEffect, useState } from "react";
import "./teachers.scss";
import axios from "axios";

const Teacher = () => {
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const [teachersCount, setTeachersCount] = useState(0);
  const LIMIT = 3;
  console.log(data);
  useEffect(() => {
    getTeachers();
  }, [page]);
  useEffect(() => {
    getTeachersCount();
  }, []);

  function getTeachers() {
    axios
      .get(
        `https://6490bc9e1e6aa71680cbb786.mockapi.io/TeachersInfo/teacher?limit=${LIMIT}&page=${page}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }

  function getTeachersCount() {
    axios
      .get(`https://6490bc9e1e6aa71680cbb786.mockapi.io/TeachersInfo/teacher`)
      .then((res) => setTeachersCount(res.data?.length))
      .catch((err) => console.log(err));
  }
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

  let teacherItems = data?.map((card) => (
    <div key={card.id} className="user__card">
      <img className="user__card__img" src={card.avatar} alt="" />
      <div className="user__card__info">
        <h1>
          {card.firstName} {card.lastName}
        </h1>

        <h3>Email : {card.email}</h3>
        <h3>Phone Number : {card.phoneNumber}</h3>
        <div className="user__card__btns">
          <button>View Students</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container user__wrapper">
      {teacherItems}
      <div className="teachers__pagination">
        <button
          className={page === 1 ? "disabled" : ""}
          disabled={page === 1 ? true : false}
          onClick={() => setPage((e) => --e)}
        >
          prev
        </button>
        {getPages()}
        <button
          className={
            page === Math.ceil(teachersCount / LIMIT) ? "disabled" : ""
          }
          disabled={page === Math.ceil(teachersCount / LIMIT) ? true : false}
          onClick={() => setPage((e) => ++e)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Teacher;
