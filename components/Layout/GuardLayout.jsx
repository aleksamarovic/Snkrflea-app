// core
import React, { useEffect, useState } from 'react'

// library
import { useSelector } from "react-redux";

// components
import { Loading } from "../../components";
import { getUserState } from "../../redux/user/selectors";
import { useRouter } from "next/router";
import { Layout } from "../../components";

export const GuardLayout = ({children}) => {
    const router = useRouter();


    const [showChildren, setShowChildren] = useState(true);

    const user = useSelector(getUserState);

    useEffect(() => {
        if (!user) {
            router.push('/');
            setShowChildren(false);
        } else {
            setShowChildren(true);
        }
    }, []);


    return (
        <Layout>
            {showChildren ? children : <Loading />}
        </Layout>
    )
};