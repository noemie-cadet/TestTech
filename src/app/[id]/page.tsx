"use client";
import "../../firebase/initFirebase";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use this instead of `useRouter` from 'next/router' in the App Router
import Job from "../../types/job"; // Adjust the import path according to your project structure

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
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{job.title}</h1>
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col w-full">
        <div className="flex flex-row items-center">
          <img className="w-20" src={job.smallCompany.logoImageLink} alt={job.smallCompany.companyName} />
          <p className="m-5 font-bold">{job.smallCompany.companyName}</p>
        </div>
        <div>
          <h2 className="font-semibold my-3">Description</h2>
          <p>{job.description}</p>
        </div>
        <div className="flex flex-row">
          <div className="mt-4">
            <p className="font-medium m-5">Skills Required:</p>
            <ul className="felx flex-wrap list-disc ml-5">
              {job.skillsList.map((skill) => (
                <li className="flex flex-row gap-3" key={skill.id}>
                  <img className="w-12 h-12 object-contain" src={skill.imageUrl} alt={skill.name} />
                  <p className="content-center">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-medium m-5">Required Experience: {job.details.requiredExperience} years</p>
          </div>
          <div className="mt-4">
            <p className="font-medium m-5">Start Date: {job.details.start}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
