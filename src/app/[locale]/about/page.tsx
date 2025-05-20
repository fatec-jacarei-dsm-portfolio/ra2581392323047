import {
    Avatar,
    Button,
    Flex,
    Heading,
    Icon,
    IconButton,
    Tag,
    Text
  } from "@/once-ui/components";
  import { baseURL, renderContent } from "@/app/resources";
  import TableOfContents from "@/components/about/TableOfContents";
  import styles from "@/components/about/about.module.scss";
  import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
  
  export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations();
    const { person, about } = renderContent(t);
  
    const title = about.title;
    const description = about.description;
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;
  
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://${baseURL}/${locale}/about`,
        images: [{ url: ogImage, alt: title }]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage]
      }
    };
  }
  
  export default async function About({ params: { locale } }: { params: { locale: string } }) {
    console.log("[About] Locale received:", locale);
  
    try {
      unstable_setRequestLocale(locale);
      console.log("[About] Locale set successfully.");
    } catch (err) {
      console.error("[About] Error setting locale:", err);
    }
  
    let t;
    try {
      t = await getTranslations();
      console.log("[About] Translations fetched.");
    } catch (err) {
      console.error("[About] Failed to fetch translations:", err);
    }
  
    let person, about, social;
    try {
      const result = renderContent(t);
      person = result.person;
      about = result.about;
      social = result.social;
  
      console.log("[About] Content rendered.");
      console.log("[About] Person:", person?.name);
      console.log("[About] Sections:", {
        intro: about?.intro?.display,
        work: about?.work?.display,
        studies: about?.studies?.display,
        technical: about?.technical?.display
      });
    } catch (err) {
      console.error("[About] Error in renderContent:", err);
      return (
        <Flex fillWidth justifyContent="center" padding="xl">
          <Text variant="body-default-l" onBackground="danger-strong">
            Erro ao carregar o conteúdo da página. Verifique o console do servidor.
          </Text>
        </Flex>
      );
    }
  
    const structure = [
      {
        title: about.intro.title,
        display: about.intro.display,
        items: []
      },
      {
        title: about.work.title,
        display: about.work.display,
        items: about.work.experiences.map(exp => exp.company)
      },
      {
        title: about.studies.title,
        display: about.studies.display,
        items: about.studies.institutions.map(i => i.name)
      },
      {
        title: about.technical.title,
        display: about.technical.display,
        items: about.technical.skills.map(skill => skill.title)
      }
    ];
  
    return (
      <Flex fillWidth maxWidth="m" direction="column">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: person.name,
              jobTitle: person.role,
              description: about.intro.description,
              url: `https://${baseURL}/about`,
              image: `${baseURL}/images/${person.avatar}`,
              sameAs: social.filter(link => link.link && !link.link.startsWith("mailto:")).map(link => link.link),
              worksFor: {
                "@type": "Organization",
                name: about.work.experiences[0]?.company || ""
              }
            })
          }}
        />
  
        {about.tableOfContent.display && (
          <Flex
            style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
            position="fixed"
            paddingLeft="24"
            gap="32"
            direction="column"
            hide="s"
          >
            <TableOfContents structure={structure} about={about} />
          </Flex>
        )}
  
        <Flex fillWidth mobileDirection="column" justifyContent="center">
          {about.avatar.display && (
            <Flex minWidth="160" paddingX="l" paddingBottom="xl" gap="m" flex={3} direction="column" alignItems="center">
              <Avatar src={person.avatar} size="xl" />
              <Flex gap="8" alignItems="center">
                <Icon onBackground="accent-weak" name="globe" />
                {person.location}
              </Flex>
              {person.languages.length > 0 && (
                <Flex wrap gap="8">
                  {person.languages.map((lang, index) => (
                    <Tag key={index} size="l">
                      {lang}
                    </Tag>
                  ))}
                </Flex>
              )}
            </Flex>
          )}
  
          <Flex className={styles.blockAlign} fillWidth flex={9} maxWidth={40} direction="column">
            <Flex
              id={about.intro.title}
              fillWidth
              minHeight="160"
              direction="column"
              justifyContent="center"
              marginBottom="32"
            >
              {about.calendar.display && (
                <Flex
                  className={styles.blockAlign}
                  style={{
                    backdropFilter: "blur(var(--static-space-1))",
                    border: "1px solid var(--brand-alpha-medium)",
                    width: "fit-content"
                  }}
                  alpha="brand-weak"
                  radius="full"
                  fillWidth
                  padding="4"
                  gap="8"
                  marginBottom="m"
                  alignItems="center"
                >
                  <Flex paddingLeft="12">
                    <Icon name="calendar" onBackground="brand-weak" />
                  </Flex>
                  <Flex paddingX="8">Schedule a call</Flex>
                  <IconButton href={about.calendar.link} data-border="rounded" variant="tertiary" icon="chevronRight" />
                </Flex>
              )}
              <Heading className={styles.textAlign} variant="display-strong-xl">
                {person.name}
              </Heading>
              <Text className={styles.textAlign} variant="display-default-xs" onBackground="neutral-weak">
                {person.role}
              </Text>
              {social.length > 0 && (
                <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap>
                  {social.map(item => (
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="tertiary"
                      />
                    )
                  ))}
                </Flex>
              )}
            </Flex>
  
            {about.intro.display && (
              <Text variant="body-default-l" marginBottom="xl">
                {about.intro.description}
              </Text>
            )}
  
            {about.work.display && (
              <>
                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                  {about.work.title}
                </Heading>
                <Flex direction="column" fillWidth gap="l" marginBottom="40">
                  {about.work.experiences.map((experience, index) => (
                    <Flex key={`${experience.company}-${index}`} fillWidth direction="column">
                      <Flex fillWidth justifyContent="space-between" alignItems="flex-end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Flex>
                      <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                        {experience.role}
                      </Text>
                      <Flex as="ul" direction="column" gap="16">
                        {experience.achievements.map((ach, idx) => (
                          <Text as="li" variant="body-default-m" key={`${experience.company}-${idx}`}>
                            {ach}
                          </Text>
                        ))}
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
  
            {about.studies.display && (
              <>
                <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                  {about.studies.title}
                </Heading>
                <Flex direction="column" fillWidth gap="l" marginBottom="40">
                  {about.studies.institutions.map((inst, index) => (
                    <Flex key={`${inst.name}-${index}`} fillWidth gap="4" direction="column">
                      <Text id={inst.name} variant="heading-strong-l">
                        {inst.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {inst.description}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
  
            {about.technical.display && (
              <>
                <Heading as="h2" id={about.technical.title} variant="display-strong-s" marginBottom="40">
                  {about.technical.title}
                </Heading>
                <Flex direction="column" fillWidth gap="l">
                  {about.technical.skills.map((skill, index) => (
                    <Flex key={`${skill.title}-${index}`} fillWidth gap="4" direction="column">
                      <Text variant="heading-strong-l">{skill.title}</Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  }
  