import { useEffect, useState } from 'react';

export default function SearchBar() {
 const [input, setInput] = useState('');
 
 useEffect(() => {
    console.log('Search input changed:', input);
 }, [input]);

  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="Search by name or email"
      className="input w-[50%] mb-4 px-4 py-2 border-2 border-gray-400 rounded focus:outline-none focus:border-black"
    />
  );
}