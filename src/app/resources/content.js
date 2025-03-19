import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Michael',
    lastName:  'Morais',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Software Developer',
    avatar:    '/images/avatar.jpg',
    location:  'America/Sao_Paulo',
    languages: ['English','Portuguese']
}

const newsletter = {
    display: true,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about software development, technology, and my journey in the industry.</>
}

const social = [
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/itsmorais',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/michael-morais22/',
    },
    {
        name: 'X',
        icon: 'x',
        link: '',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:michael.morais@fatec.sp.gov.br',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Full Stack Developer</>,
    subline: <>I'm Michael, a full stack developer at <InlineCode>Embraer</InlineCode>, where I develop high-quality and efficient solutions.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: 'https://cal.com/itsmorais'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>Michael is a software developer passionate about clean code, best practices, and scalable solutions. He is currently studying Computer Science and working at Embraer, specializing in JavaScript, Node.js, and databases.</>
    },
    work: {
        display: true,
        title: 'Work Experience',
        experiences: [
            {
                company: 'Embraer',
                timeframe: 'Sep/2023 - Present',
                role: 'Full Stack Developer',
                achievements: [
                    <>Developed a scheduling system for the aerospace sector, adopted company-wide and recognized among the top 10 internship projects.</>,
                    <>Implemented data analysis and ETL tools to optimize resource planning, improving logistics and decision-making.</>,
                    <>Refactored and modernized internal systems, improving UX and backend efficiency.</>
                ],
                images: []
            },
            {
                company: 'Nexus GeoEngenharia',
                timeframe: 'Jan/2023 - Aug/2023',
                role: 'Software Developer',
                achievements: [
                    <>Migrated a legacy .NET system to Next.js, improving performance by reducing file generation time from 2 minutes to 1 second.</>,
                    <>Developed a real-time data processing server in Node.js for IoT devices, integrating RabbitMQ and PostgreSQL.</>,
                    <>Created a React/Next.js dashboard for IoT data visualization and analytics.</>
                ],
                images: []
            }
        ]
    },
    studies: {
        display: true,
        title: 'Studies',
        institutions: [
            {
                name: 'FATEC Jacareí',
                description: <>Studying Software Development, expected graduation in December 2025.</>,
            },
            {
                name: 'UTFPR',
                description: <>Studied Systems Analysis and Development (2021 - 2022).</>,
            },
            {
                name: 'Dublin, Ireland',
                description: <>Studied English for a year, earning a B2 certificate.</>,
            }
        ]
    },
    technical: {
        display: true,
        title: 'Technical skills',
        skills: [
            {
                title: 'Node.js & TypeScript',
                description: <>Building robust backend applications using Node.js with TypeScript and MVC architecture.</>,
                images: []
            },
            {
                title: 'React & Next.js',
                description: <>Developing scalable frontend applications using React and Next.js.</>,
                images: []
            },
            {
                title: 'PostgreSQL & Prisma',
                description: <>Working with relational databases and ORM for efficient data management.</>,
                images: []
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about software development,career and technology...',
    description: `Read what ${person.name} has been up to recently`
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Software development projects by ${person.name}`
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    images: []
}

export { person, social, newsletter, home, about, blog, work, gallery };