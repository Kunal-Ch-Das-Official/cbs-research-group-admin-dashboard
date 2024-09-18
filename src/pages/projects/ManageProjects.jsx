import { useEffect, useState } from "react";
import ProjectCard from "../../components/single-use/project-card/ProjectCard";
import envConfig from "../../../envConfig";
import LoadingSpinner from "../../utils/common-loading-spinner/LoadingSpinner";
import { getAllData } from "../../../operations/apis/getAllData";
import SectionHeading from "../../components/reuseable/section-heading/SectionHeading";

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
    <main className="min-h-screen bg-gray-50">
      {loading === true && <LoadingSpinner />}
      <SectionHeading
        heading={"Manage All Details"}
        subHeading={`
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium accusamus quaerat, odit, laborum placeat ipsa corporis ipsam eaque id ullam asperiores illo! Illum ex voluptate possimus recusandae, placeat assumenda magni.`}
      />
      {allProjects ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 space-x-1 space-y-2 
         gap-1 w-full mx-auto py-20"
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
    </main>
  );
};

export default ManageProjects;
