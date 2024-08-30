"use client";

import "../firebase/initFirebase";

import Image from "next/image";
import { get, getDatabase, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    console.log("db", db);
    const jobsRef = ref(db, "/");
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

  /*   const jobsRef = ref(db, 'jobs');
  onValue(jobsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("data", data);
  }); */
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Jobs</h1>
    </main>
  );
}
