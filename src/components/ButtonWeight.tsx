import { Minus, Plus } from 'lucide-react';

interface User {
  _weight: number; 
}

interface ButtonWeightProps {
  user: User;
  updateUser: (user: Partial<User>) => void; 
}

function ButtonWeight({ user, updateUser }: ButtonWeightProps) {

  const handleMinus = () => {
    let tmp = parseFloat((user._weight - 0.1).toFixed(1)); 
    updateUser({ _weight: tmp });
  }
  const handlePlus = () => {
    let tmp = parseFloat((user._weight + 0.1).toFixed(1));
    updateUser({ _weight: tmp});
  }
  
  return (
    <div className='btn-weight'>
        <button onClick={handleMinus}>
            <Minus size={36} />
        </button>
        <h3>{user._weight}</h3>
        <button onClick={handlePlus}>
            <Plus size={36} />
        </button>
    </div>
  );
}

export default ButtonWeight;