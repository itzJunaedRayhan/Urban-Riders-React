import React, { useContext } from 'react';
import { Redirect, Route} from 'react-router';
import { userContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    console.log('private : ',loggedInUser)
    return (
            <Route
                {...rest}
                render={({ location }) =>
                loggedInUser.email  || loggedInUser.displayName ?(
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />
            )
        }
    />
    );
};

export default PrivateRoute;