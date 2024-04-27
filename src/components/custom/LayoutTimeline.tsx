import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Capaian from "./Capaian";
import { Button } from "../ui/button";
import { getAuthenticatedUser } from "@edx/frontend-platform/auth"


interface Course {
  course_name: string;
  enrollment_date: string; // Assuming date is handled as a string
}

interface FriendCourse {
  friend_id: number;
  friend_username: string;
  friend_meta: string;
  courses: Course[];
}

interface FriendsCoursesResponse {
  friendsCourses: FriendCourse[];
}

const TimelineLayout = () => {
  const [friendsCourses, setFriendsCourses] = useState<FriendCourse[]>([]);

  const fetchCourses = async () => {
    const authenticatedUser = getAuthenticatedUser();
    if (!authenticatedUser || !authenticatedUser.username) {
      console.error("No authenticated user found");
      return;
    }

    const username = authenticatedUser.username;
    try {
      const response = await fetch(`http://194.233.93.124:3030/teman/friends-timeline/${username}`);
      const data: FriendsCoursesResponse = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const filteredFriends = data.friendsCourses.filter(friend => friend.courses.length > 0);
      setFriendsCourses(filteredFriends);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Use effect to trigger the initial data fetch
  useEffect(() => {
    fetchCourses();
  }, []);  // Empty dependency array ensures this runs once on mount


  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="flex">
      <div className="flex-1 text-left mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-5">Timeline</h1>
        {friendsCourses.map((friend: FriendCourse) => (
          friend.courses.map((course: Course, index: number) => (
            <Capaian
              key={index}
              nama={friend.friend_username}
              enrollment_date={formatDate(course.enrollment_date)}  // Assuming a static date here, replace with dynamic data if available
              course_name={course.course_name}
              meta={friend.friend_meta || 'https://via.placeholder.com/150'} // Default image if no meta
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
