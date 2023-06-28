import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import BankCardInfo from './BankCardInfo';
import AddressInfo from './AddressInfo';

export enum ESteps {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3'
};


const Order: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(ESteps.step1);

  const onStepClick = (step: ESteps) => () => {
    setCurrentStep(step);
  };

  const contentByStep = {
    [ESteps.step1]: <UserInfo />,
    [ESteps.step2]: <BankCardInfo />,
    [ESteps.step3]: <AddressInfo />,
  };

  return (
    <div>
      <h1 className='title'>Order: </h1>

      <div>
        <button onClick={onStepClick(ESteps.step1)}>step 1</button>
        <button onClick={onStepClick(ESteps.step2)}>step 2</button>
        <button onClick={onStepClick(ESteps.step3)}>step 3</button>
      </div>

      <div >
        {contentByStep[currentStep]}
      </div>

      <div className='link'>
        <Link to="/">Back to Products</Link>
      </div>
      <div className='link'>
        <Link to="/cart">Back to Cart</Link>
      </div>
    </div>
  );
};

export default Order;