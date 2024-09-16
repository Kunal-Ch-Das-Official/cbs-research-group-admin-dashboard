import { useEffect, useState } from "react";
import ProjectCard from "../../components/single-use/project-card/ProjectCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";

const ManageProjects = () => {
  const [allProjects, setAllProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const output = await getAllData(setLoading, envConfig.projectsUrl);
      output && setAllProjects(output);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading === true && <LoadingSpinner />}

      {allProjects ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 space-x-1 space-y-2 
         gap-1 w-full mx-auto bg-gray-100 pt-28"
        >
          {allProjects &&
            allProjects.map((data, index) => (
              <ProjectCard
                key={index}
                projectName={data.projectName}
                currentStatus={data.projectStatus}
                uploadDate={data.createdAt}
                description={data.description}
                deleteUrl={`/admin-panel/delete-project/${data._id}`}
                updateUrl={`/admin-panel/update-project/${data._id}`}
              />
            ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-gray-500 pt-28 font-bold">
          Projects are not available.
        </h2>
      )}
    </>
  );
};

export default ManageProjects;
