// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Contador {
    uint public count;
    constructor(uint inicio) payable {
        count = inicio;
    }
    function increment() public {
        count++;
    }
    function decrement() public {
        count--;
    }
    function reset() public {
        count = 0;
    }
    function getContador() public view returns (uint) {
        return count;
    }
}