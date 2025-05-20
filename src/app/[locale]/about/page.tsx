"use client";

import { Avatar, Button, Flex, Heading, Icon, IconButton, SmartImage, Tag, Text } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import TableOfContents from '@/components/about/TableOfContents';
import styles from '@/components/about/about.module.scss'
import { useEffect, useState } from 'react';

export default function About() {
  const [content, setContent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
        const fetchedContent = renderContent() || {};
        setContent(fetchedContent);
    } catch (error) {
        console.error("Error loading content:", error);
        setContent(null);
    } finally {
        setLoading(false);
    }
}, []);

    // ✅ Show a loading state instead of infinite loop
    if (loading) {
      return (
          <Flex justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
              <Heading variant="display-strong-xl">Loading About Page...</Heading>
          </Flex>
      );
  }

  // ✅ Prevent crash if `content` is still undefined
  if (!content || !content.about || !content.person) {
      return (
          <Flex justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
              <Heading variant="display-strong-xl">Error: Could not load About Page</Heading>
          </Flex>
      );
  }

  const { person, about, social } = content;
  
  const structure = [
    { title: about.intro.title, display: about.intro.display, items: [] },
    { title: about.work.title, display: about.work.display, items: about.work.experiences.map((exp: any) => exp.company) },
    { title: about.studies.title, display: about.studies.display, items: about.studies.institutions.map((inst: any) => inst.name) },
    { title: about.technical.title, display: about.technical.display, items: about.technical.skills.map((skill: any) => skill.title) },
];

  return (
    <Flex
      fillWidth maxWidth="m"
      direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item:any) => item.link && !item.link.startsWith('mailto:')) // Filter out empty links and email links
              .map((item:any) => item.link),
            worksFor: {
              '@type': 'Organization',
              name: about.work.experiences[0].company || ''
            },
          }),
        }}
      />
      {about.tableOfContent.display && (
        <Flex
          style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }}
          position="fixed"
          paddingLeft="24" gap="32"
          direction="column" hide="s">
          <TableOfContents
            structure={structure}
            about={about} />
        </Flex>
      )}
      <Flex
        fillWidth
        mobileDirection="column" justifyContent="center">
        {about.avatar.display && (
          <Flex
            minWidth="160" paddingX="l" paddingBottom="xl" gap="m"
            flex={3} direction="column" alignItems="center">
            <Avatar
              src={person.avatar}
              size="xl" />
            <Flex
              gap="8"
              alignItems="center">
              <Icon
                onBackground="accent-weak"
                name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex
                wrap
                gap="8">
                {person.languages.map((language:string, index:number) => (
                  <Tag
                    key={index}
                    size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Flex>
        )}
        <Flex
          className={styles.blockAlign}
          fillWidth flex={9} maxWidth={40} direction="column">
          <Flex
            id={about.intro.title}
            fillWidth minHeight="160"
            direction="column" justifyContent="center"
            marginBottom="32">
            {about.calendar.display && (
              <Flex
                className={styles.blockAlign}
                style={{
                  backdropFilter: 'blur(var(--static-space-1))',
                  border: '1px solid var(--brand-alpha-medium)',
                  width: 'fit-content'
                }}
                alpha="brand-weak" radius="full"
                fillWidth padding="4" gap="8" marginBottom="m"
                alignItems="center">
                <Flex paddingLeft="12">
                  <Icon
                    name="calendar"
                    onBackground="brand-weak" />
                </Flex>
                <Flex
                  paddingX="8">
                  Schedule a call
                </Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="tertiary"
                  icon="chevronRight" />
              </Flex>
            )}
            <Heading
              className={styles.textAlign}
              variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak">
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20" paddingBottom="8" gap="8" wrap>
                {social.map((item:any) => (
                  item.link && (
                    <Button
                      key={item.name}
                      href={item.link}
                      prefixIcon={item.icon}
                      label={item.name}
                      size="s"
                      variant="tertiary" />
                  )
                ))}
              </Flex>
            )}
          </Flex>

          {about.intro.display && (
            <Text variant="body-default-l">
            {about.intro.description}
          </Text>
          
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m">
                {about.work.title}
              </Heading>
              <Flex
                direction="column"
                fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience:any, index:number) => (
                  <Flex
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                    direction="column">
                    <Flex
                      fillWidth
                      justifyContent="space-between"
                      alignItems="flex-end"
                      marginBottom="4">
                      <Text
                        id={experience.company}
                        variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m">
                      {experience.role}
                    </Text>
                    <Flex
                      as="ul"
                      direction="column" gap="16">
                      {experience.achievements.map((achievement: string, index: any) => (

                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}>
                          {achievement}
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
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m">
                {about.studies.title}
              </Heading>
              <Flex
                direction="column"
                fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution:any, index:number) => (
                  <Flex
                    key={`${institution.name}-${index}`}
                    fillWidth gap="4"
                    direction="column">
                    <Text
                      id={institution.name}
                      variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s" marginBottom="40">
                {about.technical.title}
              </Heading>
              <Flex
                direction="column"
                fillWidth gap="l">
                {about.technical.skills.map((skill:any, index:number) => (
                  <Flex
                    key={`${skill}-${index}`}
                    fillWidth gap="4"
                    direction="column">
                    <Text
                      variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text
                      variant="body-default-m"
                      onBackground="neutral-weak">
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