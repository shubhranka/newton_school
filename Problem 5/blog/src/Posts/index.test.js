import React from 'react'
import axios from "../api";
import Posts from './index'
import { render,getByTestId } from '@testing-library/react'
import { screen } from '@testing-library/dom'
jest.mock('../api')
describe('Post List',()=>{
    
    it("returns all the posts",()=>{
        React.useState = jest.fn()
        .mockReturnValueOnce([[{"_id":"32534fsdaf",postTitle:"Title 1",postData : "data 1",postUser:"testuser",postDate:Date.now()}],()=>{}])
        .mockReturnValueOnce([false,()=>{}])
        // Arrange
        axios.get.mockImplementation(()=>Promise.resolve({data : {postTitle:"Title 1",postData : "data 1",postUser:"testuser",postDate:Date.now()}}))
        axios.delete.mockImplementation(()=>Promise.resolve({data : {}}))

        // Act
        render(<Posts token="a" onLogOut={jest.fn()} user="testuser"/>)

        // Assertion
        const title = screen.getByTestId("title").innerHTML;

        expect(title).toBe("Title 1")
    })

})