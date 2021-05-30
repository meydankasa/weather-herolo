import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../firebase';


const AdminNav = () => {
    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const logoutHanler = () => {
        firebase.auth().signOut().then(()=>{
            console.log('Log out sueccedfull');
        },(error)=>{
            console.log('Eroor logging out');
        })
    }

    
    return (
        <div>
            <ListItem button style={style} onClick={()=> logoutHanler()}>
                Log out
            </ListItem>
        </div>
    );
};

export default AdminNav;