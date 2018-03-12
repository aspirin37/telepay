import Projects from '@modules/projects';
import ProjectsList from '@modules/projects/list';
import ProjectsCreate from '@modules/projects/create';

export default {
  path: '/projects',
  name: 'projects',
  component: Projects,
  redirect: { name: 'projects-list' },
  children: [{
    path: 'list',
    name: 'projects-list',
    component: ProjectsList,
  },
  {
    path: 'create',
    name: 'projects-create',
    component: ProjectsCreate
  }]
}
