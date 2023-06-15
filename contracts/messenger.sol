// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Messenger {
    
    struct User {
        uint16 messageID;
        address Address;
        string Message;
    }

    uint16 counter = 0;
    User[] public users;

    function addMessage(string memory _content) public {
        User memory user;
        user.messageID = counter;
        user.Address   = msg.sender;
        user.Message   = _content;
        counter++;

        users.push(user);
    }

    function listMessage() public view returns (User[] memory) {
        return users;
    }


}