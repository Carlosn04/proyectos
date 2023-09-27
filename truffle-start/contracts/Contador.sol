// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

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