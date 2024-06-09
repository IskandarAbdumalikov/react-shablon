import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentSingle = () => {
  let { studentId } = useParams();
  let { id } = useParams();
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  console.log(loading);
  console.log(data);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://6645a471b8925626f892813d.mockapi.io/school/teachers/${id}/students/${studentId}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="single__page container">
      <div className="teacher__image">
        <img src={data.avatar} alt="" />
      </div>
      <div className="teacher__info">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default StudentSingle;
