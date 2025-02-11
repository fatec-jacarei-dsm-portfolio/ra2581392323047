import { InlineCode } from "@/once-ui/components";

const createI18nContent = (t) => {
    const person = {
        firstName: 'Michael',
        lastName:  'Morais',
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:      t("person.role"),
        avatar:    '/images/avatar.jpg',
        location:  'America/Sao_Paulo',
        languages: [t("languages.english"), t("languages.portuguese"), t("languages.french")]
    }

    const newsletter = {
        display: true,
        title: <>{t("newsletter.title", {firstName: person.firstName})}</>,
        description: <>{t("newsletter.description")}</>
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
            link: 'https://www.linkedin.com/in/michaelmorais22/',
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
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline", {company: 'Embraer'})}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.title"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true,
            title: t("about.work.title"),
            experiences: [
                {
                    company: 'Embraer',
                    timeframe: '2023 - Present',
                    role: t("about.work.experiences.embraer.role"),
                    achievements: [
                        t("about.work.experiences.embraer.achievements.1"),
                        t("about.work.experiences.embraer.achievements.2"),
                        t("about.work.experiences.embraer.achievements.3")
                    ],
                    images: []
                },
                {
                    company: 'Nexus GeoEngenharia',
                    timeframe: '2023',
                    role: t("about.work.experiences.nexus.role"),
                    achievements: [
                        t("about.work.experiences.nexus.achievements.1"),
                        t("about.work.experiences.nexus.achievements.2"),
                        t("about.work.experiences.nexus.achievements.3")
                    ],
                    images: []
                }
            ]
        },
        studies: {
            display: true,
            title: t("about.studies.title"),
            institutions: [
                {
                    name: 'FATEC Jacareí',
                    description: <>{t("about.studies.institutions.fatec.description")}</>,
                },
                {
                    name: 'UTFPR',
                    description: <>{t("about.studies.institutions.utfpr.description")}</>,
                },
                {
                    name: 'Dublin, Ireland',
                    description: <>{t("about.studies.institutions.dublin.description")}</>,
                }
            ]
        },
        technical: {
            display: true,
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'Node.js & TypeScript',
                    description: <>{t("about.technical.skills.node.description")}</>,
                    images: []
                },
                {
                    title: 'React & Next.js',
                    description: <>{t("about.technical.skills.react.description")}</>,
                    images: []
                },
                {
                    title: 'PostgreSQL & Prisma',
                    description: <>{t("about.technical.skills.postgresql.description")}</>,
                    images: []
                }
            ]
        }
    }

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
    }

    const gallery = {
        label: t("gallery.label"),
        title: t("gallery.title"),
        description: t("gallery.description", {name: person.name}),
        images: []
    }

    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        gallery
    }
};

export { createI18nContent };
