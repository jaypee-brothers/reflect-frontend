import { VideosTable } from 'src/components/tables/VideosTable';

const VideoContentManagement = () => {
  return (
    <>
      <VideosTable />
    </>
  );
};

// Ensure VideosTable does not show any id column or id value to the user

export default VideoContentManagement;
