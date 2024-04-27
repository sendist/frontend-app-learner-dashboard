import React from 'react';

interface MinatProps {
  minat: string;
}

const Minat: React.FC<MinatProps> = ({ minat }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="mr-10 w-32 h-16 bg-[#F9A682] text-orange-100 flex items-center justify-center">
        <p className="text-center">{minat}</p>
      </div>
    </div>
  );
};

export default Minat;
