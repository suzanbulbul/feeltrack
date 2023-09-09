import React from 'react';

const Table = () => {
  return (
    <div>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Başlık 1
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Başlık 2
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Başlık 3
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              Veri 1
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              Veri 2
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              Veri 3
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
