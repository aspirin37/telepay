import Projects from '@modules/projects';
import ProjectsList from '@modules/projects/list';
import ProjectsCreate from '@modules/projects/create';

export default {
  path: '/projects',
  name: 'projects',
  component: Projects,
  meta: { auth: true },
  redirect: { name: 'projects-list' },
  children: [{
    path: 'list',
    name: 'projects-list',
    component: ProjectsList,
    meta: { auth: true }
  },
  {
    path: 'create',
    name: 'projects-create',
    component: ProjectsCreate,
    meta: { auth: true }
  }]
}
