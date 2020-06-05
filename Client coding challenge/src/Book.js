import React from 'react';

function Book( props ){

    return(
        <div>
            {/*
                Your code goes here
            */}
            <div>
                <h1>
                    Title: ${props.title}
                </h1>
                <p>
                    Authors: ${props.authors}
                </p>
                <img src="${props.thumbnail}"></img>
                <p>
                    Snippet: ${props.snippet}
                </p>
            </div>
        </div>
    );
}

export default Book;