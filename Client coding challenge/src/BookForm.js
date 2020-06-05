import React from 'react';

function BookForm( props ){
    return(
        <div>
            {/*
                Your code goes here
            */}
            <form onSubmit={() => props.fetchBooks(event)}>
                <label htmlFor="bookName">
                    Book name:
                </label>
                <input type="text" name="bookName" id="bookName"/>

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default BookForm;