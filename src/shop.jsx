import './shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Item=(props)=>{
    return (<div key={props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200}/><br/>
        id: {props.id}<br/>
        Name: {props.name}<br/>
        Price: {props.price}<br/>
    </div>)
}
export default function Shop(){
        const [products,setProducts] = useState([])
        const url = "https://redesigned-goggles-44vrj4v4q9rfqp4j-5000.app.github.dev";
        useEffect(()=>{
            axios.get(url+'/api/products').then(response=>{
                setProducts(response.data);
            }).catch(error=>{
                console.log("error");
            });
            return ()=>{

            }
        },[])
        const productlist=products.map(item=><Item {...item} callback={addCart}/>)
        const [cart,setcart]=useState([]);
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        function addCart(item){
            setcart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}])
        }
        const cartList=cart.map((item,index)=><li>{item.id} {item.name} {item.price} 
        <button onClick={()=>{
            setcart(cart.filter((i,_index)=>index!=_index));
        }}>
        remove</button></li>)
        return (<>
            <div className='grid-container'>{productlist}</div>
            <h1>Cart</h1>
            <h1>All price {totalPrice}</h1>
            <button onClick={()=>setcart([])}>reset</button>
            <ol>{cartList}</ol>
        </>);
}