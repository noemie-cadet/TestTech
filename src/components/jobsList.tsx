import Job from "@/types/job";
import "@/firebase/initFirebase";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Box, Card, Divider, Typography, Link } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const jobsRef = ref(getDatabase(), "jobs");

    get(jobsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setJobs(Object.values(snapshot.val()));
          console.log("value", snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting data", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8">
      {jobs.map((job: Job, index) => (
        <a key={job.id} href={`job/${index}`} className="block w-full">
          <Card variant="outlined" className="bg-white p-4 relative rounded-lg shadow-md">
            <Box className="flex items-center mb-4">
              {job.smallCompany.logoImageLink && <img src={job.smallCompany.logoImageLink} alt={job.smallCompany.companyName} className="w-20 mr-4" />}
              <Typography variant="h6" className="font-bold">
                {job.smallCompany.companyName}
              </Typography>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" className="font-semibold mb-2">
                {job.title}
              </Typography>
              <Typography className="line-clamp-3">{job.description}</Typography>
            </Box>
            <Divider className="my-2" />
            <Box className="mb-4">
              <Typography variant="body2" className="font-semibold mb-2">
                Compétences requises:
              </Typography>
              <div className="flex flex-wrap gap-2">
                {job.skillsList.map((skill) =>
                  skill.imageUrl ? (
                    <img key={skill.id} src={skill.imageUrl} alt={skill.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <Typography key={skill.id} variant="body2" className="bg-gray-100 p-2 rounded-lg text-sm">
                      {skill.name}
                    </Typography>
                  )
                )}
              </div>
            </Box>
            <Box className="mb-2">
              <Typography variant="body2" className="font-semibold inline">
                Experience:
              </Typography>
              <Typography variant="body2" component="span">
                {job.details.requiredExperience} ans
              </Typography>
            </Box>
            <Box className="mb-2">
              <Typography variant="body2" className="font-semibold inline">
                Date de début:
              </Typography>
              <Typography variant="body2" component="span">
                {job.details.start}
              </Typography>
            </Box>
            <Link href={`job/${index}`} className="text-blue-500 hover:underline float-right">
              Voir plus
            </Link>
          </Card>
        </a>
      ))}
    </div>
  );
};
