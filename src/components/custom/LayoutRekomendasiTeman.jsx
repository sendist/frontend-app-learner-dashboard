import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Temanbelajar from "./ListTeman"; // Make sure to use the correct import
import { getAuthenticatedUser } from "@edx/frontend-platform/auth"

const LayoutRekomendasiTeman = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const authenticatedUser = getAuthenticatedUser(); // Assumed synchronous for this example
      if (!authenticatedUser || !authenticatedUser.username) {
        console.error("No authenticated user found");
        return;
      }

    const username = authenticatedUser.username;
    console.log(authenticatedUser)
    try {
      const response = await fetch(`http://194.233.93.124:3030/teman/friend-users/${username}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://194.233.93.124:3030/teman/searchUser?keyword=${searchKeyword}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to search users", error);
      alert("Error searching for users: " + error.message);
    }
  };
    
  const handleManageFollow = async (targetUsername) => {
    const authenticatedUser = getAuthenticatedUser();
    if (!authenticatedUser || !authenticatedUser.username) {
      alert("Authentication is required to follow/unfollow.");
      return;
    }

    const username1 = authenticatedUser.username;
    const username2 = targetUsername;

    const url = `http://194.233.93.124:3030/teman/follow`;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ username1, username2 });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unknown error');

      alert(`Follow status for ${targetUsername} has been ${data.follow.is_follow ? 'initiated' : 'toggled'}.`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error managing follow status:', error.message);
      alert(error.message);
    }
  };




  return (
    <div className="flex">
      <div className="flex-1 text-left mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-5">Cari Teman Belajar</h1>
        <div className="flex items-center">
          <Input 
            className="ml-4 w-1/2"
            placeholder="Cari Teman Belajar"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button className="bg-[#38B0AB] hover:bg-teal-700" onClick={handleSearch}>
            Cari
          </Button>
        </div>
        {users.map(user => (
          <Temanbelajar
            key={user.id}
            nama={user.username}
            bio={user.bio || 'No bio available'}
            meta={user.meta || 'https://via.placeholder.com/150'}
            isFollowed={user.is_follow}
            phone_number={user.phone_number}
            onToggleFollow={() => handleManageFollow(user.username)}// Placeholder for actual follow toggle logic
          />
        ))}
        <div className="mt-4">
          <Link to="/findfriends/timeline">
            <Button className="bg-[#38B0AB] hover:bg-teal-700">
              Lihat Timeline
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LayoutRekomendasiTeman;
