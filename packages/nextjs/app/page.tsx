"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, AddressInput, Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {

  const { address } = useAccount();

  const { data: greeting } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: yourContract } = useDeployedContractInfo("YourContract");

  const [newGreeting, setNewGreeting] = useState("");

  const { writeAsync: setGreeting } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
  });

  const [newMinter, setNewMinter] = useState("");
  const [newAmount, setNewAmount] = useState<any | null>(null);

  const { writeAsync: mint } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "mint",
    args: [newMinter, newAmount],
  });

  return <>

      {/**Create a Address and Balance component */}
      <div className="flex items-center flex-col flex-grow pt-10">
      <div>
        <Address address={address} />
        <Balance address={address} />
      </div>

      {/**Display the current greeting */}
      <div className="p-5 font-black text-xl">{greeting}</div>

      {/**Create an Address and Balance component for your contract */}
      <div>
          <Address address={yourContract?.address} />
          <Balance address={yourContract?.address} />
      </div>

      {/**Create a input field and button for our setGreeting function */}
      <div className="p-5">
        <input
            value={newGreeting}
            placeholder="Type here"
            className="input"
            onChange={(e) => setNewGreeting(e.target.value)}
          />
        </div>
        <div className="p-5">
          <button className="btn btn-primary" onClick={setGreeting}>
            Set Greeting
          </button>
      </div>

      {/**Create input fields and button for our sendMessage function*/}
      <div className="p-5">
        <AddressInput
            value={newMinter}
            placeholder="Minter?"
            name={address}
            onChange={setNewMinter}
        />
      </div>
      <div className="p-5">
        <input
            value={newAmount}
            placeholder="Amount"
            className="input"
            onChange={(e) => setNewAmount(e.target.value)}
        />
      </div>
      <div className="p-5">
          <button className="btn btn-primary" onClick={mint}>
            Mint TKN Tokens
          </button>
      </div>
    </div>
  </>;
};

export default Home;