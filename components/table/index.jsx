import React from 'react';

//Icons
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Table = ({ data }) => {
  console.log(data);

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-white">
            <th className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
              Date
            </th>
            {data[0].items.map((item, itemIndex) => (
              <th
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                key={itemIndex}
              >
                {item.key} <br /> ( {item.value} )
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr className="bg-white" key={index}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                {data.date}
              </td>
              {data.items.map((item, itemIndex) => (
                <td
                  className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                  key={itemIndex}
                >
                  <span className="flex justify-center">
                    {item.select === true ? (
                      <FaCheck
                        style={{
                          fontSize: "1.1rem",
                          color: "green",
                        }}
                      />
                    ) : (
                      <IoCloseSharp
                        style={{
                          fontSize: "1.5rem",
                          color: "red",
                        }}
                      />
                    )}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
