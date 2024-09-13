import React from 'react';

function ServerError() {
    return (
        <p
            data-testid="server-error"
            className="flex justify-center flex-row m-auto items-center"
        >
            An Error occurred while trying to reach the server. Try refreshing
            to load the page.
        </p>
    );
}

export default ServerError;
