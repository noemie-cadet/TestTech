import Job from "@/types/job";
import "@/firebase/initFirebase";
import { get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Box, Card, Divider, Typography, Link, Dialog, Button, Backdrop } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

export const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<{ [key: string]: Job }>({});
  const [open, setOpen] = React.useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const handleDelete = (index: string) => () => {
    const newJobs = Object.fromEntries(Object.entries(jobs).filter(([key]) => key !== index));
    setJobs(newJobs);

    try {
      const jobsRef = ref(getDatabase(), "jobs");
      setOpen(false);
      set(jobsRef, newJobs);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  useEffect(() => {
    const jobsRef = ref(getDatabase(), "jobs");

    get(jobsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setJobs(snapshot.val());
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
      {Object.entries(jobs).map(([id, job]) => (
        <Card variant="outlined" className="bg-white p-4 relative rounded-lg shadow-md">
          <DeleteForeverIcon className="text-gray-300 absolute right-3" onClick={openDialog} />
          <Dialog slotProps={{ backdrop: {style: { backgroundColor: "transparent" } }}} open={open} onClose={closeDialog}>
            <Box className="p-4">
              <Typography variant="h6" className="font-bold mb-4">
                Êtes-vous sûr de vouloir supprimer cette offre ?
              </Typography>
              <Button onClick={handleDelete(id)} className="mr-2">
                Oui
              </Button>
              <Button onClick={closeDialog}>Non</Button>
            </Box>
          </Dialog>
          <a key={job.id} href={`job/${id}`} className="block w-full">
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
            <Link href={`job/${id}`} className="text-blue-500 hover:underline float-right">
              Voir plus
            </Link>
          </a>
        </Card>
      ))}
    </div>
  );
};
