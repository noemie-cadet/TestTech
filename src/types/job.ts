interface Job {
  companyId: string;
  creatorId: string;
  description: string;
  descriptionPreview: string;
  details: {
      acceptRemote: string;
      requiredExperience: number;
      requiredExperiencePro: number;
      start: string;
  };
  helmetImageLink: string;
  publishDate: number;
  seoAlias: string;
  skillsList: {
      id: string;
      name: string;
      tags: string[];
      imageUrl: string;
      value: number;
      oldUrl?: string;
      versions?: {
          font: string[];
          svg: string[];
      };
  }[];
  status: string;
  title: string;
  smallCompany: {
      companyName: string;
      logoImageLink: string;
      id: string;
      seoAlias: string;
      gallery: {
          imageImageLink: string;
      };
  };
  id: string;
}

export default Job;
