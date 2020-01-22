import React from 'react';
import Button from "./button/Button";
import Input from './input/Input'
import Textarea from "./textarea/Textarea";
import Dropdown from "./dropdown/Dropdown";
import Preloader from "./preloader/Preloader";

function _Demo(props) {
    return (
        <React.Fragment>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '100px'}}>
                <Dropdown>
                    <Button type='submit' buttonColorScheme='transparent' buttonSize='small'>Logout</Button>
                </Dropdown>
            </div>


            <div className='button-wrap'>
                <Button type='submit' buttonColorScheme='primary' buttonSize='small' className='123'>Sign in</Button>
                <Button type='submit' buttonColorScheme='danger' buttonSize='medium'>Sign in</Button>
                <Button type='submit' buttonColorScheme='transparent' buttonSize='small'>Sign in</Button>
                <Button type='submit' buttonColorScheme='light' buttonSize='small'>Sign in</Button>
                <Button type='submit' buttonColorScheme='pearl' buttonSize='large'>Sign in</Button>
            </div>


            <div style={{width: '300px'}}>
                <Input placeholder='E-mail' type='email' errorMessage='Enter an E-mail!' iconName='user'/>
            </div>
            <div style={{width: '300px'}}>
                <Input placeholder='E-mail' type='email' iconName='password'/>
            </div>


            <Textarea name="title" cols="30" rows="10" isInvalid={true} placeholder='title'/>
            <Textarea name="title" cols="30" rows="10" isInvalid={false} placeholder='description'/>
            <Preloader/>

        </React.Fragment>
    );
}

export default _Demo;
