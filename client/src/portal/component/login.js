
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { Breadcrumb, Card, Layout, Spin, Row, Col, Divider, Button } from 'antd';
const { Content } = Layout;
import { GoogleOutlined } from '@ant-design/icons';
import { updateUser } from '../../ngo/store/actions';




const LoginPage = (props) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();


    console.log({ auth, provider })
    const signInWithGoogle = async () => {


        signInWithPopup(auth, provider).then((result) => {
            console.log({ result })
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            console.error({ error })
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error({ credential })
            // ...
        });



    };
    return <>
        <Content>

            <section style={{ marginTop: 50, textAlign: 'center', fontSize: 30 }}>
                <div style={{ fontSize: 30 }}>
                    <Button size="large" icon={<GoogleOutlined />} onClick={() => signInWithGoogle()}>Login / Signup with Google</Button>
                </div>
            </section>
        </Content>

    </>
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export default LoginPage;