const ActivityPayment = ({ price, coupon }) => {
  const couponAmount = (price / 100) * coupon;
  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex justify-between text-lg">
        <h2 className="underline ">Activity Price</h2>
        <p>${price}</p>
      </div>
      {/* <div className='flex justify-between text-lg'>
          <h2 className='underline '>VAT</h2>
          <p>$5.75</p>
        </div>
        <div className='flex justify-between text-lg'>
          <h2 className='underline '>Service fee</h2>
          <p>$0</p>
        </div> */}
      <div className="flex justify-between text-lg">
        <h2 className="underline ">Discount (Copun)</h2>
        <p>${couponAmount}</p>
      </div>
      <div className="flex justify-between py-3 border-t font-semibold border-gray-400 text-lg">
        <h2 className=" ">Total</h2>
        <p>${price - couponAmount}</p>
      </div>
    </div>
  );
};

export default ActivityPayment;
