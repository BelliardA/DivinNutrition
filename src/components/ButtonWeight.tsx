import { Minus, Plus } from 'lucide-react';
import "../style/ButtonWeight.css";

interface User {
  weight: number; 
}

interface ButtonWeightProps {
  user: User;
  updateUser: (user: Partial<User>) => void; 
}

function ButtonWeight({ user, updateUser }: ButtonWeightProps) {

  const handleMinus = () => {
    let tmp = parseFloat((user.weight - 0.1).toFixed(1)); 
    updateUser({ weight: tmp });
  }
  const handlePlus = () => {
    let tmp = parseFloat((user.weight + 0.1).toFixed(1));
    updateUser({ weight: tmp});
  }
  
  return (
    <div className='btn-weight'>
        <button onClick={handleMinus}>
            <Minus size={36} />
        </button>
        <h3>{user.weight} kg</h3>
        <button onClick={handlePlus}>
            <Plus size={36} />
        </button>
    </div>
  );
}

export default ButtonWeight;