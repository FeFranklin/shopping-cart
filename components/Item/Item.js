import React from 'react';
import Image from 'next/image'
import styles from '../../styles/Item.module.scss';

const Item = ({ imgSrc, title, price, discountPrice}) => {
  return (
    <div className="d-flex justify-content-start w-100 py-2 px-4">
      <div className={`border border-2 ${styles.cart__img}`}>
        <Image
          src={imgSrc}
          alt='Image of product'
          width={120}
          height={120}
        />
      </div>
      <div className={`d-flex flex-column mx-3 py-1 ${styles.cart__textContainer}`}>
        <p>{title || 'Produto'}</p>
        <p className={styles.cart__secText}>{`R$ ${price || 'FREE'}`}</p>
        <p className={styles.cart__price}>{`R$ ${discountPrice || 'FREE'}`}</p>
      </div>
    </div>
  )
};

export default Item;