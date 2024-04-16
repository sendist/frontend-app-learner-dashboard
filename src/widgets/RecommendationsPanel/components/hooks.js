import track from '../track';

export const useCourseCardData = (course, isControl) => {
  const handleCourseClick = (e) => {
    e.preventDefault();

    track.recommendedCourseClicked(
      course.courseKey,
      isControl,
      course?.marketingUrl,
    )(e);
  };
  return { handleCourseClick };
};

export default useCourseCardData;
