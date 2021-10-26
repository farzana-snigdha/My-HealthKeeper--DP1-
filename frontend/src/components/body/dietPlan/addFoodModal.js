import React, { useState, useEffect } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Select, MenuItem, makeStyles } from "@material-ui/core";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";
//import {getRice, riceList} from "./FoodList"
import Autocomplete from "@material-ui/lab/Autocomplete";

const InitialState = {
  meal: "",
  food: "",
  quantity: "",
  err: "",
  success: "",
};

export default function AddFoodModal({ showFoodModal, setShowFoodModal }) {
  const token = useSelector((state) => state.token);
  const [riceItem, setRiceItem] = useState([]);
  const [mealType, setMealItem] = useState("");
  const getRice = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getFoodMenu", {
        headers: { Authorization: token },
      })
      .then((res) => setRiceItem(res.data));
  };
  const options = riceItem.map((option) => {
    const initialLetter = option.category;
    return {
      initialLetter,
      ...option,
    };
  });

  const [item, setItem] = useState(InitialState);

  const { meal, food, quantity, err, success } = item;

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setItem({ ...item, [name]: value, err: "", success: "" });
  };

  useEffect(async () => {
    getRice();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:5000/diet-plan/addFoodItem",
        {
          meal: mealType,
          food,
          quantity,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        console.log("food modal ", res);
        setItem({ ...item, err: "", success: "Food added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setItem({ ...item, err: err.response.data.msg, success: "" });
      });

    setTimeout(function () {
      setItem(InitialState);
    }, 100);
  };

  return (
    <>
      <div>
        <FormControl>
          <InputLabel>Meal Type</InputLabel>

          <Select
            id="meal"
            name="meal"
            className="meal_type_select"
            required
            value={mealType}
            onChange={(e) => {
              setMealItem(e.target.value);
            }}
          >
            <option value={"Breakfast"}>Breakfast</option>
            <option value={"Lunch"}>Lunch</option>
            <option value={"Snacks"}>Snacks</option>
            <option value={"Dinner"}>Dinner</option>
          </Select>
        </FormControl>
        <pre></pre>

        <Autocomplete className='food_name_select'
          onChange={(event, value) => setItem({ food: value.name })}
          getOptionSelected={(option, value) => option.id === value.id}
          options={options.sort(
            (a, b) => -b.initialLetter.localeCompare(a.initialLetter)
          )}
          groupBy={(option) => option.initialLetter}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField  {...params} label="Food Name" />}
        />

        <pre></pre>

        <TextField
          type="text"
          id="foodName"
          name="quantity"
          label="Quantity"
          value={quantity}
          onChange={handleChange}
        ></TextField>
      </div>
      <div className="add_btn_diet">
        <Button
          type="submit"
          className="add_btn"
          variant="contained"
          onClick={handleSubmit}
          color="white"
        >
          <font className="add_btn_diet_font"> Add food</font>
        </Button>
      </div>
    </>
  );
}
