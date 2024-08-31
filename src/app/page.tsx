"use client";

import "../firebase/initFirebase";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Job from "../types/job";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    console.log("db", db);
    const jobsRef = ref(db, "jobs");
    console.log("jobsRef", jobsRef);

    get(jobsRef)
      .then((snapshot) => {
        console.log("snapshot", snapshot);
        if (snapshot.exists()) {
          console.log("val", snapshot.val());
          setJobs(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log("Error getting data", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Jobs</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {jobs.map((job: Job, index) => (
          <div key={job.id} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
            <div className="divide-y-2">
              <div>
                <div className="flex flex-row items-center">
                  <img className="w-20" src={job.smallCompany.logoImageLink} alt={job.smallCompany.companyName} />
                  <p className=" m-5 font-bold">{job.smallCompany.companyName}</p>
                </div>
                <div>
                  <h2 className="font-semibold my-3">{job.title}</h2>
                  <p className="line-clamp-3">{job.description}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 gap-2">
                <div className="hidden lg:flex flex-row gap-4">
                  <p className="font-medium">Skills:</p>
                  <div className="md:grid lg:grid-cols-6 gap-4 items-center">
                    {job.skillsList.map((skill) =>
                      skill.imageUrl ? (
                        <div key={skill.id} className="flex flex-col items-center justify-center">
                          <img className="w-12 h-12 object-contain" src={skill.imageUrl} alt={skill.name} />
                        </div>
                      ) : (
                        <p key={skill.id} className="text-start text-sm p-3 bg-gray-100 rounded-lg">
                          {skill.name}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <p className="font-medium mr-2">Experience: </p>
                  <p> {job.details.requiredExperience} ans</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-medium mr-2">Date de début: </p>
                  <p className=""> {job.details.start}</p>
                </div>
                <a className="float-right text-gray-400 underline" href={`/${index}`}>
                  Voir plus
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
