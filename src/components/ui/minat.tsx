import React from 'react';

interface MinatProps {
  minat: string;
}

const Minat: React.FC<MinatProps> = ({ minat }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="mr-10 p-1 px-2 bg-[#F9A682] text-orange-100 rounded-md flex items-center justify-center">
        <p className="text-center">{minat}</p>
      </div>
    </div>
  );
};

export default Minat;
