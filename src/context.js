import { createContext, useContext } from 'react';

const ProjectContext = createContext();
export default ProjectContext;

export const useProject = () => useContext(ProjectContext);
