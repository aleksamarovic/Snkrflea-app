// core
import React from "react";

// library
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";

// components
import { SocialButton } from "..";
import { USER_SIGN_IN_BY_FACEBOOK_REQUEST } from "../../redux/auth/sagas";

// assets
import styles from "../SocialButton/SocialButton.module.scss";

const {NEXT_PUBLIC_FACEBOOK_AUTH_CLIENT_ID} = process.env;

export const FaceBookButton = ({}) => {
    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        const {accessToken} = response;
        dispatch({type: USER_SIGN_IN_BY_FACEBOOK_REQUEST, payload: accessToken});
    };

    return (
        <FacebookLogin
            appId={NEXT_PUBLIC_FACEBOOK_AUTH_CLIENT_ID}
            autoLoad={false}
            callback={responseFacebook}
            render={renderProps => (
                <SocialButton
                    onClick={renderProps.onClick}
                    styles={styles.facebook}
                    iconClasses={"fab fa-facebook-square"}
                    buttonText={"Facebook"} />)} />
    )
};
