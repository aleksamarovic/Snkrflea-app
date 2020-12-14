// core
import React from "react";

// library
import classNames  from "classnames";

export const SocialButton = ({ styles, iconClasses, buttonText, onClick  }) => (
    <div>
            <button type="button" className={classNames(styles, 'button')}  onClick={onClick}>
                 <i className={iconClasses} />
                 <span>{buttonText}</span>
            </button>
    </div>
);
