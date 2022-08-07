import "./styles.css";
import Data from "./data";
import { useEffect, useState } from "react";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { AiFillLeftSquare, AiFillRightSquare } from "react-icons/ai";

export default function App() {
  const [userData, setUserData] = useState(Data);
  const [index, setIndex] = useState(0);

  // If the Index Value reached to end set up index to 0
  // and if index value reached to less than 0 set it to last value
  useEffect(() => {
    let lastIndex = userData.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, userData]);

  // Change Index value in every 3 second
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <div className="App">
      <h1 className="heading">
        <span className="slash">/</span> Reviews
      </h1>

      <div className="Main__Section">
        {userData.map((items, indexvalue) => {
          const { id, image, title, name, quote } = items;
          let position = "nextSlide";
          if (indexvalue === index) position = "activeSlide";
          if (
            indexvalue === index - 1 ||
            (index === 0 && indexvalue === indexvalue.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="Person__Image" />
              <h3 className="Person__Name">{name}</h3>
              <p className="Job__title">{title}</p>
              <p className="quote">{quote}</p>
              <BsChatSquareQuoteFill className="quote__Icon" />
            </article>
          );
        })}

        <button className="next__btn" onClick={() => setIndex(index - 1)}>
          <AiFillLeftSquare />
        </button>
        <button className="prev__btn" onClick={() => setIndex(index + 1)}>
          <AiFillRightSquare />
        </button>
      </div>
    </div>
  );
}
