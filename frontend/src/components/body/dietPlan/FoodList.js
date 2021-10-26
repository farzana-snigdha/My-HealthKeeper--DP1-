import React,{useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

const FoodList =() => {
    const token = useSelector((state) => state.token);
    const [riceItem, setRiceItem] = useState([]);

    const getRice = async () => {
    
        await axios
          .get("http://localhost:5000/diet-plan/getFoodMenu/"+"Rice", {
            headers: { Authorization: token },
          })
          .then((res) => setRiceItem(res.data));
    };
    
    const riceList = () => {
        return riceItem;
      };
}

