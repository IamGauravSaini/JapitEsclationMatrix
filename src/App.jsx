import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import DeleteColumn from "./components/DeleteColumn";
import Each from "./components/Each";

const App = () => {
  // const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);
  const [taskData, setTasksData] = useState([]);
  const [deleteRegion, setDeletedRegion] = useState(null);
  const [RegionsObjectModal, setRegionsObjectModal] = useState([]);

  const fetchOriginApi = async () => {
    const Api = `https://japit_backend.smart24x7.com/FetchRegions`;
    try {
      if (RegionsObjectModal.length === 0) {
        const response = await axios.get(Api);
        console.log(response.data.India);
        let data = response.data.India;
        data.push({ Region: "Not Serviced", States: [] });
        setRegionsObjectModal(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOriginApi();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const handleDelete = (taskIndex, status, RegionIndex) => {
    let RegionsObjectModalClone = [...RegionsObjectModal];
    let deletedValue = RegionsObjectModalClone[RegionIndex].States[taskIndex];
    const notServicedIndex = RegionsObjectModalClone?.length - 1;
    console.log(notServicedIndex);

    RegionsObjectModalClone[RegionIndex].States = RegionsObjectModalClone[
      RegionIndex
    ].States.filter((x, i) => i !== taskIndex);
    RegionsObjectModalClone[notServicedIndex].States = [
      ...RegionsObjectModalClone[notServicedIndex].States,
      deletedValue,
    ];
    setRegionsObjectModal(RegionsObjectModalClone);
  };

  //delete function ends here=---------------------------------------------------------
  const onDrop = (position, status, RegionIndex) => {
    if (position == null || activeCard === undefined) return null;

    console.log(
      `${activeCard.index} From ${activeCard.RegionIndex} is going to place on the index  ${status}${RegionIndex} and at the position ${position}`
    );
    let RegionsObjectModalClone = [...RegionsObjectModal];
    let dragedValue =
      RegionsObjectModalClone[activeCard.RegionIndex].States[activeCard.index];
    RegionsObjectModalClone[activeCard.RegionIndex].States.splice(
      activeCard.index,
      1
    );
    RegionsObjectModalClone[RegionIndex].States.splice(
      position,
      0,
      dragedValue
    );
    console.log(RegionsObjectModalClone[activeCard.RegionIndex].States);
    setRegionsObjectModal(RegionsObjectModalClone);
  };

  const AddNewRegion = () => {
    if (RegionsObjectModal?.length >= 8) {
      alert("You can't add more than 7 regions");
    } else {
      let RegionsObjectModalClone2 = [...RegionsObjectModal];

      const region = {
        Region: "Region-1",
        States: [],
      };
      RegionsObjectModalClone2.splice(
        RegionsObjectModalClone2.length - 1,
        0,
        region
      );
      setRegionsObjectModal(RegionsObjectModalClone2);
    }
  };
  console.log(RegionsObjectModal);

  //Delteing the region Functionality ---------------------------------------------------
  useEffect(() => {
    if (deleteRegion !== null && RegionsObjectModal?.length > 2) {
      console.log(deleteRegion);
      let RegionsObjectModalClone = [...RegionsObjectModal];
      let removedRegion = RegionsObjectModalClone?.splice(
        deleteRegion.RegionIndex,
        1
      )[0];
      RegionsObjectModalClone[RegionsObjectModalClone.length - 1].States = [
        ...RegionsObjectModalClone[RegionsObjectModalClone.length - 1].States,
        ...removedRegion.States,
      ];
      console.log(removedRegion);
      console.log(RegionsObjectModalClone);
      setRegionsObjectModal(RegionsObjectModalClone);
    } else if (deleteRegion !== null) {
      alert("you should add atleast one Region");
    }
  }, [deleteRegion]);

  const SubmitForm = () => {
    localStorage.setItem("RegionData", JSON.stringify(RegionsObjectModal));
    alert("Data Saved");

    const data = localStorage.getItem("RegionData");
    // Send the data to the parent window
    window.parent.postMessage(data, "https://japit.in");
    console.log("message sent successfully");
  };

  return (
    <div className="app">
      <div className="app_header">
        <img
          decoding="async"
          class="japit-main-logo"
          src="https://japit.in/wp-content/uploads/2024/08/JAPit_logo_transparent.png"
          alt="logo"
          height="40px"
          className="Japit_Icon_Image"
        />
        <h1>Select Regions </h1>
      </div>
      {/* <TaskForm set ={setTasks} /> */}
      <main className="app_main">
        <Each
          of={RegionsObjectModal}
          render={(item, index) => {
            return (
              <TaskColumn
                title={item.Region}
                icon={todoIcon}
                tasks={item.States}
                status={item.Region}
                handleDelete={handleDelete}
                setActiveCard={setActiveCard}
                onDrop={onDrop}
                RegionIndex={index}
                setRegionsObjectModal={setRegionsObjectModal}
                setDeletedRegion={setDeletedRegion}
              />
            );
          }}
        />

        {/* <DeleteColumn
          title="Not Serviced"
          icon={doneIcon}
          tasks={tasks}
          status="Deleted"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        /> */}
      </main>
      <div className="app_Footer_SubmitBtton_Container">
        <button className="app_Submit" onClick={() => AddNewRegion()}>
          Add New Region
        </button>

        <button className="app_Submit" onClick={SubmitForm}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
