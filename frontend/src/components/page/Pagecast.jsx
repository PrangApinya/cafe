import React, { useEffect } from 'react';
import { useCart } from '../context/Cart';
import './Pagecast.css';
import Cafe from '../cafehead/Cafe';
import axios from 'axios';

const Pagecast = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  useEffect(() => {
    console.log('Cart:', cart);
  }, [cart]);

  // ฟังก์ชันสั่งการ Buzzer ผ่าน API
  const handlePurchase = async () => {
    try {
      // เรียก API ที่ไปสั่งการ Raspberry Pi
      await axios.get('http://localhost:8085/buzzer/buzzer'); // แก้ URL ให้ตรงกับ API ที่เรียกไฟล์ Python บน Raspberry Pi
      alert('สั่งซื้อสำเร็จและสั่ง Buzzer เรียบร้อยแล้ว!');
    } catch (error) {
      console.error('Error triggering buzzer:', error);
      alert('เกิดข้อผิดพลาดในการสั่ง Buzzer');
    }
  };

  return (
    <div>
      <Cafe />
      <div className="box2">
        <div className="boxcast">
          <p>My Cart</p>
          <p>สินค้าในตะกร้า: {cart.length}</p>
        </div>
        <div className="cast-items">
          {cart.map((item) => (
            <div className="cast-item" key={item.id}>
              <img className="item-image" src={`/src/assets/img/${item.filename}`} alt={item.filename} />
              <h3 className="item-name">{item.name}</h3>
              <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
              <p className="item-quantity">{item.quantity}</p>
              <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <button onClick={handlePurchase}>ซื้อสินค้า</button> {/* กดปุ่มเพื่อสั่ง buzzer */}
      </div>
    </div>
  );
};

export default Pagecast;
