import { ActivityLevel, Sexe, ProfessionalActivity } from "../objects/Constants";

interface UserInterface{
    name : string;
    age : number;
    height : number;
    weight : number;
    activity : ActivityLevel;
    sexe : Sexe;
    activityPro : ProfessionalActivity;
  
}

export default UserInterface;