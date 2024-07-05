import React from 'react';


import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// npm i @paypal/react-paypal-js


const Pay = () => {
  const paypalOptions = {
    'client-id': "ATk54uQ1577RvrtZYcpd75nVa_ySiT6RiHDqSQ6QYRFwuBGzNiidyjcu7p64u93Bh18jkS2idxInj87l", // Replace with your actual PayPal client ID
    currency: 'USD',
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '100.00', // Replace with the amount you want to charge
          },
        },
      ],
    });
  };


  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {


      // Handle successful payment
      console.log(details);
      // You can add more logic here, like updating the UI or notifying the user
    });
  };


  const onError = (err) => {
    // Handle errors
    console.error(err);
  };


  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};


export default Pay;