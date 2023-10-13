import { ExperienceData } from "../Context/WorkExperienceContext";

export const saveExperienceToLocalStorage = (state: ExperienceData[]) => {
  localStorage.setItem('workExperienceData', JSON.stringify(state));
} 
export const removeExperienceToLocalStorage = (item:string) => {
  localStorage.removeItem(item);
} 