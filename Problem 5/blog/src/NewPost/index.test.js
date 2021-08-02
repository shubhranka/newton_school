import { render } from '@testing-library/react';
import React from 'react';
import NewPost from '.';

describe("New Post",()=>{
    it('should Render Correctly',()=>{
        render(<NewPost></NewPost>);
    })
})