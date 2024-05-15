import React, { useEffect, useState } from "react";
import "./teachers.scss";
import axios from "axios";

const Teacher = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [teachersCount, setTeachersCount] = useState(0);
  const LIMIT = 3;

  useEffect(() => {
    getTeachers();
    getTeachersCount();
  }, [page]);

  function getTeachers() {
    axios
      .get(
        `https://664459ac6c6a6565870a02a2.mockapi.io/schoole/teachers?limit=${LIMIT}&page=${page}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }

  function getTeachersCount() {
    axios
      .get(`https://664459ac6c6a6565870a02a2.mockapi.io/schoole/teachers`)
      .then((res) => setTeachersCount(res.data?.length))
      .catch((err) => console.log(err));
  }

  const handleDelete = (id) => {
    if (confirm("are you sure")) {
      axios
        .delete(
          `https://664459ac6c6a6565870a02a2.mockapi.io/schoole/teachers/${id}`
        )
        .then(() => {
          setData(data.filter((teacher) => teacher.id !== id));
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
          <button onClick={() => handleDelete(card.id)}>Delete</button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="teachers">
      <div className="container user__wrapper">{teacherItems}</div>
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
    </div>
  );
};

export default Teacher;
