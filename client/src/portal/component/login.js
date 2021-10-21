
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from "firebase/auth";
import { Breadcrumb, Card, Layout, Spin, Row, Col, Divider, Button } from 'antd';
const { Content } = Layout;
import { GoogleOutlined } from '@ant-design/icons';
import { updateUser } from '../../ngo/store/actions';




const LoginPage = (props) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error({ credential })
        });
    };

    const signInWithEmailLink =() => {
   
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'http://localhost',
            // This must be true.
            handleCodeInApp: true,            
            
          };
        sendSignInLinkToEmail(auth, 'khizaras@gmail.com',actionCodeSettings).then(() => {
            console.log("sent email")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error({error})
        });
    };
    return <>
        <Content>

            <section style={{ marginTop: 50, textAlign: 'center', fontSize: 30 }}>
                <Row>
                    <Col span={24}>
                        <div style={{ fontSize: 30 }}>
                            <Button size="large" icon={<GoogleOutlined />} onClick={() => signInWithGoogle()}>Login / Signup with Google</Button>
                        </div>
                    </Col>                  
                </Row>
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