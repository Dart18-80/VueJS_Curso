export interface RouterLink {
    name:  string;
    path:  string;
    title: string;
}

export const routeLinks: RouterLink[] = [
    { name: 'home', path: '/', title: 'Inicio' },
    { name: 'about', path: '/about', title: 'Sobre' },
    { name: 'characters', path: '/characters', title: 'Personajes' }
]