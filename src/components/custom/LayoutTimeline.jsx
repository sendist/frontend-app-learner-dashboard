import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Capaian from "./Capaian";
import { Button } from "../ui/button";
import { getAuthenticatedUser } from "@edx/frontend-platform/auth"

const TimelineLayout = () => {
  const [friendsCourses, setFriendsCourses] = useState([]);

  const fetchCourses = async () => {
    const authenticatedUser = getAuthenticatedUser();
    if (!authenticatedUser || !authenticatedUser.username) {
      console.error("No authenticated user found");
      return;
    }

    const username = authenticatedUser.username;
    try {
      const response = await fetch(`http://194.233.93.124:3030/teman/friends-timeline/${username}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const filteredFriends = data.friendsCourses.filter(friend => friend.courses.length > 0);
      setFriendsCourses(filteredFriends);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="flex">
      <div className="flex-1 text-left mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-5">Timeline</h1>
        {friendsCourses.map((friend, index) => (
          friend.courses.map((course, idx) => (
            <Capaian
              key={idx}
              nama={friend.friend_username}
              enrollment_date={formatDate(course.enrollment_date)}
              course_name={course.course_name}
              meta={friend.friend_meta || 'https://via.placeholder.com/150'}
            />
          ))
        ))}
        <div className="mt-4">
          <Link to="/findfriends">
            <Button className="bg-[#38B0AB] hover:bg-teal-700">
              Cari Teman
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimelineLayout;
