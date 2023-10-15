import React from 'react';

// Icons
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Table = ({ data }) => {
  const sortedData = Object.entries(data).sort((a, b) => new Date(b[0]) - new Date(a[0]));

  return (
    <div>
      {sortedData.length && (
        <table className="min-w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                Date
              </th>
              {sortedData[0][1].map((item, itemIndex) => (
                <th
                  className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                  key={itemIndex}
                >
                  {item.title} <br /> ( {item.value} )
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map(([date, dateData], dateIndex) => (
              <tr className="bg-white" key={dateIndex}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                  {date}
                </td>
                {dateData.map((item, itemIndex) => (
                  <td
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                    key={itemIndex}
                  >
                    <span className="flex justify-center">
                      {item.selected === true ? (
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
      )}
    </div>
  );
};

export default Table;
