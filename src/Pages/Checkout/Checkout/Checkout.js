import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import useServiceDetail from '../../../hooks/useServiceDetail';
import auth from '../../../firebase.init';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    if (user) {
        console.log(user)
    }

    // const [user, setUser] = useState({
    //     name: 'sebok',
    //     email: 'sebok@def.co',
    //     address: "Cox'sbazar, Bangladesh",
    //     phone: '01730661569'
    // });
    // const handleAddressChange = e => {
    //     const { address, ...rest } = user;
    //     const newAddress = e.target.value;
    //     const newUser = { address: newAddress, ...rest };
    //     console.log(newUser);
    //     setUser(newUser);
    // }
    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' value={user.displayName} type="text" name='name' placeholder='name' required disabled readOnly />
                <br />
                <input className='w-100 mb-2' value={user.email} readOnly disabled type="email" name='email' placeholder='email' required />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='service' required />
                <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='address' autoComplete='off' required />
                <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;