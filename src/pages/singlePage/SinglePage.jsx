import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePages.scss";

const SinglePage = () => {
  let { id } = useParams();
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  console.log(loading);
  console.log(data);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://6645a471b8925626f892813d.mockapi.io/school/teachers/${id}`)
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
        <h1>
          {data.firstName} {data.lastName}
        </h1>
      
        <h3>{data.email}</h3>
        <h3>{data.phoneNumber}</h3>
        <button>See students</button>
      </div>
    </div>
  );
};

export default SinglePage;
