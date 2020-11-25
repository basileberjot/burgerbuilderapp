import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipcode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        // management of price would be on the backend normally..
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Baz',
                address: {
                    street: 'Rue test',
                    zipCode: '47000',
                    country: 'France'
                },
                email: 'test@test.fr',
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
                .then(response => {
                    this.setState({loading: false });
                    this.props.history.push('/');
            })
                .catch(error => {
                    this.setState({loading: false });
            }); 
    }

    render () {
        let form = (                
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="zipcode" placeholder="Zipcode"/>
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact information</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;