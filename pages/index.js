import handlers from '../utils/handlers';
import styles from '../styles/Home.module.scss';
import Divider from '../components/divider/divider';
import Item from '../components/Item/Item';
import React, { useState, useEffect } from 'react';

// handlers.getAcima().then(res => console.log(res)).catch(err => console.log(err));
const decimal = (price) => parseFloat(price/100).toFixed(2);

const setTotalPrice = (data) => {
  if (data === undefined || !data.length ){
    return 0;
  }
  return decimal(data.reduce((prev, current) => prev + current.sellingPrice, 0));
}

const Home = () => {
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //dev variable to change products by clicking the button
  const [changeProd, setChangeProd] = useState(true);

  const fetchData = async (type) => 
      await handlers[type]()
      .then(res => {
        setItems(res?.data?.items);
        setTotal(setTotalPrice(res?.data?.items));
        setLoading(false);
      })
      .catch(err => console.log(err));

  useEffect(() => {
    setLoading(true);
    fetchData('getAcima');
  }, []);
  

  return (
    <div 
      className={`.container w-50 border border-1 shadow-lg d-flex flex-column align-items-center ${styles.cart__container}`}
    >
      <h3 className='my-3'>Meu Carrinho</h3>
      <Divider />
      {items && items?.length > 0 && items.map(item => 
        <Item
          key={item.uniqueId}
          title={item?.name}
          price={decimal(item?.price)}
          discountPrice={decimal(item?.sellingPrice)}
          imgSrc={item?.imageUrl}
        />
      )}
      <Divider />
      {loading && <p className='mt-5'>Loading...</p>}
      <div className='d-flex py-3 px-4 w-100 justify-content-between'>
        <p className='my-1'>TOTAL</p>
        <p className='my-1'>{`R$ ${total}`}</p>
      </div>
      {!!(total && total > 10) && (
        <div className={`rounded-pill border-0 d-flex justify-content-center alert alert-success ${styles.cart__notification}`} role="alert">
          Parabéns, sua compra com frete grátis!
        </div>
      )}      
      <Divider />
      <div className='my-3 w-100 px-3'>
        <button onClick={() => {
          fetchData(changeProd ? 'getAbaixo' : 'getAcima');
          setChangeProd(prev => !prev);
        }} type="button" className="btn btn-primary w-100">Finalizar Compra</button>
      </div>
    </div>
  )
}

export default Home;
