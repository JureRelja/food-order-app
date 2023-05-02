import React, { useEffect, useState, useCallback } from "react";
import style from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import axios from "axios";

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestError, setRequestError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://react-testing-e8f2f-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const data = await response.data;

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setRequestError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <section className={style.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (requestError) {
    return (
      <section className={style.mealsLoading}>
        <p>{requestError}</p>
      </section>
    );
  }

  return (
    <div className={style.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem meal={meal} key={meal.id} />
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default AvailableMeals;
