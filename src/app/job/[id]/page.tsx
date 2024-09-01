"use client";

import "../../../firebase/initFirebase";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use this instead of `useRouter` from 'next/router' in the App Router
import Job from "../../../types/job"; // Adjust the import path according to your project structure
import { Box, Card, Typography, CircularProgress, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function JobDetails({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const db = getDatabase();
      const jobRef = ref(db, `jobs/${id}`);
      get(jobRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setJob(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.log("Error getting data", error);
        });
    }
  }, [id]);

  if (!job) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ minHeight: "100vh", p: 4 }}>
      <Typography variant="h2" gutterBottom>
        {job.title}
      </Typography>
      <Box display="flex" gap={4}>
        <Box flex={3} p={2}>
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Avatar src={job.smallCompany.logoImageLink} alt={job.smallCompany.companyName} sx={{ width: 56, height: 56 }} />
            <Typography variant="h4">{job.smallCompany.companyName}</Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {job.description}
          </Typography>
          <Box mt={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Required Experience: {job.details.requiredExperience} years
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Start Date: {job.details.start}
            </Typography>
          </Box>
        </Box>
        {(job.skillsList && job.skillsList.length != 0) && (
          <Box flex={1} p={2}>
            <Typography variant="h5" gutterBottom>
              Skills Required
            </Typography>
            <List>
              {job.skillsList.map((skill) => (
                <ListItem key={skill.id}>
                  <ListItemAvatar>
                    <Avatar src={skill.imageUrl} alt={skill.name} sx={{ width: 48, height: 48 }} />
                  </ListItemAvatar>
                  <ListItemText primary={skill.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Card>
  );
}
