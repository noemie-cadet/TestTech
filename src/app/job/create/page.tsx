"use client";
import "../../../firebase/initFirebase";
import { SelectChangeEvent } from "@mui/material";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, FormHelperText, InputLabel } from "@mui/material";
import { getDatabase, push, ref, set } from "firebase/database";
import Job from "../../../types/job";

export default function JobForm() {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    acceptRemote: "OCCASIONALLY",
    requiredExperience: 0,
    start: "",
    companyName: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.name as keyof Job;
    setFormData({
      ...formData,
      [name]: e.target.value as string,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const jobRef = ref(getDatabase(), "jobs");
      const newJobData = push(jobRef);

      set(newJobData, {
        companyId: "",
        creatorId: "",
        description: formData.description,
        descriptionPreview: "",
        details: {
          acceptRemote: formData.acceptRemote,
          requiredExperience: formData.requiredExperience,
          requiredExperiencePro: 0,
          start: formData.start,
        },
        helmetImageLink: "",
        publishDate: Date.now(),
        skillsList: [
          { id: "-M5CNXKxy9oNYmEz-cSx", name: "AngularJS", tags: ["framework", "javascript"], imageUrl: "https://cdn.filestackcontent.com/z91tv0taRZ6O3HgtDx8g", value: 70 },
          { id: "-M5CNXKxy9oNYmEz-cT1", name: "Bootstrap", tags: ["css", "framework", "css3"], imageUrl: "https://cdn.filestackcontent.com/KpqfSnDETpWiARvX8goF", value: 70 },
          {
            id: "-M5CNXKzkSuZBbUdiuEv",
            name: "PHP",
            oldUrl: "https://firebasestorage.googleapis.com/v0/b/jechercheundev.appspot.com/o/devicons%2Ficons%2Fphp.svg?alt=media&token=d86e30c1-dea7-4dd8-956f-8086b3934bb8",
            tags: ["programming", "language"],
            imageUrl: "https://cdn.filestackcontent.com/eTxIlJh0RgGuszJ6VBA1",
            value: 70,
            versions: { font: ["plain"], svg: ["original", "plain"] },
          },
        ],
        status: "PUBLISHED",
        title: formData.title,
        smallCompany: {
          companyName: formData.companyName,
          logoImageLink: "",
          id: "",
          seoAlias: "",
          gallery: {
            imageImageLink: "",
          },
        },
        id: "",
      });
      alert("Job created successfully");
    } catch (error) {
      console.error("Error saving the data:", error);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4">Creez une annonce</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Nom du poste" name="title" value={formData.title} onChange={handleInputChange} required margin="normal" />
        <TextField fullWidth label="Entreprise" name="companyName" value={formData.companyName} onChange={handleInputChange} required margin="normal" />
        <TextField fullWidth multiline rows={6} label="Description" name="description" value={formData.description} onChange={handleInputChange} required margin="normal" />
        <TextField
          fullWidth
          type="number"
          label="Experience requises (Années)"
          name="requiredExperience"
          value={formData.requiredExperience}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Télétravail</InputLabel>
          <Select name="acceptRemote" value={formData.acceptRemote} onChange={handleSelectChange} required>
            <MenuItem value="NEVER">NON</MenuItem>
            <MenuItem value="OCCASIONALLY">PONCTEL</MenuItem>
            <MenuItem value="ALWAYS">OUI</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Start Date" name="start" value={formData.start} onChange={handleInputChange} required margin="normal" />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
