import Week from "../objects/Week";
import User from "../objects/User";
import { useState } from "react";
import userStock from "../store/User";
import useFetchMeals from "../hook/useFetchMeal";
import useUserStore from "../store/User";

function DashBoard() {
    const userStock = useUserStore((state) => state.user);

    const user = new User(userStock._name, userStock._age, userStock._weight, userStock._height, userStock._activity, userStock._sexe, userStock._activityPro);
    const [week, setWeek] = useState<Week>(new Week(1)); 

    const  {loading  } = useFetchMeals(user);

    if(loading){
        return <h1>Loading...</h1>
    }
    else{
        console.log(week);
    }
    
  return (
    <div>
        
    </div>
  );
}

export default DashBoard;