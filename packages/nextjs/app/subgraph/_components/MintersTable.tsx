"use client";

import { gql, useQuery } from "@apollo/client";
import { Address } from "~~/components/scaffold-eth";

const MintersTable = () => {
const GET_TOKENINITS = gql`
query MyQuery {
    tokenInits(orderBy: id, orderDirection: asc) {
      id
      to
      amount
    }
  }
`;

const { loading, error, data: tokenInitsData } = useQuery(GET_TOKENINITS);

const tokenInits = tokenInitsData?.tokenInits || [];

  // Subgraph maybe not yet configured
  if (error) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="overflow-x-auto shadow-2xl rounded-xl">
        <table className="table bg-base-100 table-zebra">
          <thead>
            <tr className="rounded-xl">
              <th className="bg-primary"></th>
              <th className="bg-primary">Minters</th>
              <th className="bg-primary">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tokenInitsData?.tokenInits?.map((tokenInit: any, index: number) => {
              return (
                <tr key={tokenInit.id}>
                  <th>{index + 1}</th>
                  <td>
                    <Address address={tokenInit.to} />
                  </td>
                  <td>{tokenInit.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MintersTable;
