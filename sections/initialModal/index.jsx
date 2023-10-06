import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Firebase
import { saveUserInformation } from "../../utilities/firebase";

// Redux
import { infoHandle, selectUser } from "../../redux/userSlice";

// Icons
import {  AiFillPlusCircle } from "react-icons/ai";
import { PiArrowUUpLeftBold } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import { BsCheckCircle } from "react-icons/bs";

const InitialModal = ({onClose}) => {
  const dispatch = useDispatch();
  const [docVisible, setDocVisible] = useState(false);
  const [wakeupTime, setWakeupTime] = useState('06:00');
  const [bedtime, setBedtime] = useState('23:59');
  const [exercise, setExercise] = useState(30);
  const [items, setItems] = useState([]);
  const [newItemKey, setNewItemKey] = useState('');
  const [newItemValue, setNewItemValue] = useState('');
  const [addArea, setAddArea] = useState(true);

  const user = useSelector(selectUser);

  const toggleDoc = () => {
    setDocVisible(!docVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = await saveUserInformation(user.uid, wakeupTime, bedtime, exercise, items);
      const userInformation= {userInfo}
      dispatch(infoHandle(userInformation));
      onClose();
    } catch (error) {
      console.error("Bilgiler kaydedilirken hata oluştu: ", error);
    }
    onClose();
  };

  const handleAddItem = () => {
    setAddArea(true);
    if (newItemKey && newItemValue) {
      const newItem = { [newItemKey]: newItemValue };
      setItems([...items, newItem]);
      setNewItemKey('');
      setNewItemValue('');
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="initialModal">
      <div className="docButton">
        <button className="primaryButton" onClick={toggleDoc}>
          {docVisible ? "Bilgilendirmeyi Gizle" : "Bilgilendirme İçin Tıklayın"}
        </button>
      </div>
      {docVisible && (
          <h1>
            Sağlıklı bir yaşam sürdürebilmeniz için günlük olarak yapmanız
            gereken bazı temel şeyler vardır:
          </h1>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input mb-4 flex justify-between items-center">
          <label className="label block font-semibold">Uyanış Saati:</label>
          <input
            type="time"
            name="wakeupTime"
            value={wakeupTime}
            onChange={(e) => setWakeupTime(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="input mb-4 flex justify-between items-center">
          <label className="label block font-semibold">Egzersiz Süresi:</label>
          <input
            type="number"
            name="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="input mb-4 flex justify-between items-center">
          <label className="label block font-semibold">Yatış Saati:</label>
          <input
            type="time"
            name="bedtime"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        {items.length > 0 && (
          <div>
            {items.length > 0 && (
              <div>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="input mb-4 flex justify-between items-center"
                  >
                    <label className="label block font-semibold">
                      {Object.keys(item)[0]}
                    </label>
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        name="bedtime"
                        value={Object.values(item)[0]}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index][newItemKey] = e.target.value;
                          setItems(newItems);
                        }}
                        className="border rounded-md p-2 w-full"
                        style={{ width: "150px" }}
                      />
                      <RxCrossCircled
                        className="cursor-pointer"
                        onClick={() => handleRemoveItem(index)}
                        style={{
                          fontSize: "1.5rem",
                          color: "red",
                          marginLeft: "22px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {addArea ? (
          <button
            className="flex justify-between items-center"
            onClick={() => setAddArea(!addArea)}
          >
            <AiFillPlusCircle
              className="cursor-pointer"
              style={{
                fontSize: "1.5rem",
                color: "green",
                marginRight: "10px",
              }}
            />
            Alan ekle
          </button>
        ) : (
          <div className="input mb-4 flex justify-between items-center">
            <input
              type="text"
              placeholder="Alan Adı"
              value={newItemKey}
              onChange={(e) => setNewItemKey(e.target.value)}
              className="border rounded-md p-2 w-full"
              style={{ width: "150px" }}
            />
            <div className="flex justify-center items-center">
              <input
                type="string"
                placeholder="Alan Değeri"
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
                className="border rounded-md p-2 w-full"
                style={{ width: "150px" }}
              />
              {newItemKey && newItemValue ? (
                <BsCheckCircle
                  onClick={handleAddItem}
                  className="cursor-pointer"
                  style={{
                    fontSize: "1.3rem",
                    marginLeft: "25px",
                    color: "green",
                  }}
                />
              ) : (
                <PiArrowUUpLeftBold
                  style={{ fontSize: "1.3rem", marginLeft: "25px" }}
                  onClick={() => {
                    setAddArea(true);
                  }}
                />
              )}
            </div>
          </div>
        )}

        <button type="submit" className="secondaryButton submitButton">
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default InitialModal;
