// core
import React from "react";

// components
import { SocialButton } from "..";

// assets
import styles from "../SocialButton/SocialButton.module.scss";

export const GoogleButton = ({}) => {

    return (
            <div>
                   <SocialButton
                    onClick={async () => {
                        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/sign-in`;
                    }}
                    styles={styles.google}
                    iconClasses={"fab fa-google"}
                    buttonText={"Google"} />
            </div>
              
    )
        
    
};
