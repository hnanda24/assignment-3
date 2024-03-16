import React, { useState, useEffect } from 'react';
import axios from 'axios';

const mockCafes = [
  { id: 1, name: 'Cafe A', location: 'Location A' },
  { id: 2, name: 'Cafe B', location: 'Location B' },
  { id: 3, name: 'Cafe C', location: 'Location C' },
  { id: 4, name: 'Cafe D', location: 'Location D' },
];

const App = () => {
  const [cafes, setCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API request delay
    const delay = setTimeout(() => {
      setCafes(mockCafes);
      setLoading(false);
    }, 1000);

    // Cleanup function
    return () => clearTimeout(delay);
  }, []);

  const filteredCafes = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search cafes..."
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : cafes.length === 0 ? (
        <p>No cafes found.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Cafe Name</th>
              <th className="border border-gray-300 p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredCafes.map(cafe => (
              <tr key={cafe.id}>
                <td className="border border-gray-300 p-2">{cafe.name}</td>
                <td className="border border-gray-300 p-2">{cafe.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
