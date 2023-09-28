import React from 'react';

const Table = ({ data }) => {

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            {data.map((item, index) => (
              <th
                key={index}
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
              >
                {item.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            {data.map((item, index) => (
              <td
                key={index}
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
              >
                {item.value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
