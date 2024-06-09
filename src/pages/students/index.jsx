import React, { useEffect, useState } from "react";
import "./students.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Students = () => {
  let { id } = useParams();
  let [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    getStudents();
  }, []);
  let getStudents = () => {
    axios
      .get(
        `https://6645a471b8925626f892813d.mockapi.io/school/teachers/${id}/students`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  let students = data?.map((student) => (
    <div className="student__card" key={student.id}>
      <Link to={`/teachers/${id}/students/${student.id}`}>
        <img src={student.avatar} alt="" />
      </Link>
      <div className="student__card__info">
        <h1>{student.name}</h1>
        <p>{student.description}</p>
      </div>
    </div>
  ));

  return <div className="container students">{students}</div>;
};

export default Students;
