import React, { useState, useCallback, useEffect } from "react";
import FieldItem from "./FieldItem";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let colors = [
  "#bef104",
  "#03b922",
  "#ff5ec1",
  "#008fbb",
  "#00eeff",
  "#ff0000",
  "#ff8800",
  "#c8b7f7",
  "#2b00a1",
  "#44253b",
  "#254425",
  "#550000",
  "#f8fc00",
  "#424242",
  "#fcfcfc",
  "#810077",
  "#fcc100",
  "#665300",
];

function createCardBoard() {
  const colorList = colors?.concat(...colors);
  const shuffledArray = shuffleArray(colorList);

  return shuffledArray.map((el, ind) => {
    return { id: ind, color: el, open: false };
  });
}

const Field = () => {
  const [openCardsAmount, setOpenCardsAmount] = useState(0);
  const [cardList, setCardList] = useState(createCardBoard);
  const [showModal, setShowModal] = useState(false);
  const [currentCards, setCurrentCards] = useState([]);

  const isWin = () => {
    if (currentCards.length === 2 && openCardsAmount === cardList.length - 2)
      return true;
  };

  const getCompare = (prev, next) => {
    return prev.color === next.color ? true : false;
  };

  const startAgain = () => {
    setShowModal(false);
    setCardList(createCardBoard());
    setCurrentCards([]);
    setOpenCardsAmount(0);
  };

  const finishGame = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (isWin()) return finishGame();

    if (currentCards.length === 3) {
      let isSame = getCompare(currentCards[0], currentCards[1]);
      if (!isSame) {
        changeOpenStatus(currentCards[0]);
        changeOpenStatus(currentCards[1]);
        setCurrentCards((prev) => {
          return [prev[2]];
        });
      } else {
        setOpenCardsAmount((prevState) => prevState + 2);
        setCurrentCards((prev) => {
          return [prev[2]];
        });
      }
    }
  }, [currentCards]);

  const handler = useCallback((params) => {
    changeOpenStatus(params);

    if (currentCards.length === 0) {
      setCurrentCards((prev) => {
        return [...prev, params];
      });
    }
  }, []);

  const changeOpenStatus = (params) => {
    setCardList((prevItems) =>
      prevItems.map((item) => {
        return item.id !== params.id ? item : { ...item, open: !item.open };
      })
    );
  };

  return (
    <>
      {showModal && (
        <div className="modal-wrap">
          <div className="modal">
            <div className="modal__title">
              <p> Вы победили! Попробуем снова?</p>
              <button onClick={startAgain} className="modal__btn">
                Да!
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="app-wrap">
        <div className="field">
          {cardList.map((params, ind) => {
            return (
              <FieldItem
                key={ind}
                params={params}
                handler={handler}
                currentCards={currentCards}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Field;
