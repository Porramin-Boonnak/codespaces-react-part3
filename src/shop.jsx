import './shop.css';
import { useEffect, useState,useRef } from 'react';
import axios from 'axios';
const Item=(props)=>{
    return (<div key={props.id} >
        <img src={props.img} width={200} height={200}/><br/>
        id: {props.id}<br/>
        Name: {props.name}<br/>
        Price: {props.price}<br/>
        <input type='submit' value='update' onClick={()=>props.update(props)}/><br/>
        <input type='submit' value='addcart' onClick={()=>props.callback(props)}/><br/>
        <input type='submit' value='Delete' onClick={()=>props.del_callback(props.id)}/>
    </div>)
}
export default function Shop(){
        let id; 
        const name_ref=useRef(null); 
        const price_ref=useRef(null); 
        const img_ref=useRef(null); 
        const [products,setProducts] = useState([])
        const url = "https://miniature-waffle-pvw6jvw4xjw3r4w4-5001.app.github.dev";
        useEffect(()=>{
            axios.get(url+'/api/products').then(response=>{
                setProducts(response.data);
            }).catch(error=>{
                console.log("error");
            });
            return ()=>{

            }
        },[])
        const productlist=products.map(item=><Item {...item} callback={addCart} del_callback={del_product} update={updateProductfrom}/>)
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
        function addproduct(){
            const data = {
                name : name_ref.current.value,
                price:price_ref.current.value,
                img: img_ref.current.value
            }
            axios.post(url+'/api/products',data).then(response=>{
                setProducts(response.data);
            }).catch(error=>{
                console.log("error");
            });
        }
        function del_product(id){
            axios.delete(url+'/api/products/'+id).then(response=>{
                setProducts(response.data)
            }).catch(error=>{
                console.log("error");
            });
        }
        function updateProductfrom(item){
            id=item.id;
            name_ref.current.value=item.name;
            price_ref.current.value=item.price;
            img_ref.current.value=item.img;
        }

        function updateProduct(){
            const data={
                name:name_ref.current.value,
                price:price_ref.current.value,
                img:img_ref.current.value
            }
            axios.put(url+'/api/products/'+id,data).then(response=>{
                setProducts(response.data)
            }).catch(error=>{
                console.log("error");
            });
        }
        return (<>
            name :<input type='text' ref={name_ref}/>
            price :<input type='text' ref={price_ref}/>
            img :<input type='text' ref={img_ref}/>
            <input type='submit' value='add' onClick={addproduct}/>
            <input type='submit' value='update' onClick={updateProduct}/>
            <div className='grid-container'>{productlist}</div>
            <h1>Cart</h1>
            <h1>All price {totalPrice}</h1>
            <button onClick={()=>setcart([])}>reset</button>
            <ol>{cartList}</ol>
        </>);
}