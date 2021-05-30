import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';


const AdminNav = () => {

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom:'1px solid #353535'
    }


    const logoutHandler = () => {
        firebase.auth().signOut().then(()=>{
            console.log('Log out succesfull')
        },(error)=>{
            console.log('Error logging out')
        })
    }

    return (
        <div>
            <ListItem button style={style} onClick={()=> logoutHandler()}>
                Log out
            </ListItem>
        </div>
    );
};

export default AdminNav;