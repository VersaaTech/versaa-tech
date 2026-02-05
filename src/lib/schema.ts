import { Job } from './db';

// Base URL for all schema references
export const BASE_URL = 'https://www.versaatech.com';

// Organization Schema for Versaatech
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Versaatech',
  url: BASE_URL,
  logo: `${BASE_URL}/favicons/android-chrome-512x512.png`,
  description:
    'Versaatech is a global human capital solutions provider specializing in executive search, recruitment process outsourcing, HR services, payroll management, and industry benchmarking across Africa, Middle East, and beyond.',
  email: 'info@versaatech.com',
  telephone: '+254781126819',
  sameAs: [
    'https://www.linkedin.com/company/versaatech',
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
      name: 'Dubai Office',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'The Mirage, Tower 2, Floor M1, Unit 7',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
      name: 'Kenya Office',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+254781126819',
      contactType: 'customer service',
      email: 'info@versaatech.com',
      areaServed: ['AE', 'KE', 'Africa', 'Middle East'],
      availableLanguage: ['English'],
    },
  ],
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -1.2921,
        longitude: 36.8219,
      },
      geoRadius: '5000000',
      name: 'Africa',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 25.276987,
        longitude: 55.296249,
      },
      geoRadius: '3000000',
      name: 'Middle East',
    },
  ],
};

// WebSite Schema with SearchAction
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Versaatech',
  url: BASE_URL,
  description:
    'Global human capital solutions provider specializing in executive search, recruitment, HR services, and payroll management.',
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/jobs?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Service Schema Generator
export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
}

export function generateServiceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed = ['Africa', 'Middle East', 'United Arab Emirates', 'Kenya'],
}: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}/#service`,
    name,
    description,
    url,
    serviceType,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
            description,
          },
        },
      ],
    },
  };
}

// JobPosting Schema Generator
export function generateJobPostingSchema(job: Job) {
  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${BASE_URL}/jobs/${job.id}/#jobposting`,
    title: job.title,
    description: job.description,
    datePosted: job.posted_date
      ? new Date(job.posted_date).toISOString().split('T')[0]
      : job.created_at
        ? new Date(job.created_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: BASE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location || 'Remote',
      },
    },
    employmentType: mapEmploymentType(job.job_type),
  };

  // Add application deadline if available
  if (job.application_deadline) {
    baseSchema.validThrough = new Date(job.application_deadline)
      .toISOString()
      .split('T')[0];
  }

  // Add salary information if available
  if (job.salary_min || job.salary_max) {
    baseSchema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: job.salary_currency || 'USD',
      value: {
        '@type': 'QuantitativeValue',
        ...(job.salary_min && job.salary_max
          ? { minValue: job.salary_min, maxValue: job.salary_max }
          : job.salary_min
            ? { value: job.salary_min }
            : { value: job.salary_max }),
        unitText: 'YEAR',
      },
    };
  }

  // Add skills if available
  if (job.skills && job.skills.length > 0) {
    baseSchema.skills = job.skills;
  }

  // Add experience requirements if available
  if (job.experience_level) {
    baseSchema.experienceRequirements = mapExperienceLevel(job.experience_level);
  }

  // Add responsibilities if available
  if (job.responsibilities) {
    baseSchema.responsibilities = job.responsibilities;
  }

  // Add qualifications/requirements if available
  if (job.requirements) {
    baseSchema.qualifications = job.requirements;
  }

  // Add work mode/job location type
  if (job.work_mode) {
    baseSchema.jobLocationType = mapWorkMode(job.work_mode);
  }

  // Add department if available
  if (job.department) {
    baseSchema.industry = job.department;
  }

  // Add application URL or email
  if (job.application_url) {
    baseSchema.directApply = true;
  }

  return baseSchema;
}

// Breadcrumb Schema Generator
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`,
    })),
  };
}

// Contact Page Schema Generator
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${BASE_URL}/contact/#contactpage`,
    name: 'Contact Versaatech',
    description:
      'Get in touch with Versaatech for executive search, recruitment, HR services, and payroll management solutions.',
    url: `${BASE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Versaatech',
      email: 'info@versaatech.com',
      telephone: '+254781126819',
      address: [
        {
          '@type': 'PostalAddress',
          name: 'Dubai Office',
          streetAddress: 'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        {
          '@type': 'PostalAddress',
          name: 'Kenya Office',
          streetAddress: 'The Mirage, Tower 2, Floor M1, Unit 7',
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '13:00',
        },
      ],
    },
  };
}

// Helper function to map job types to Schema.org employment types
function mapEmploymentType(
  jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship'
): string {
  const mapping: Record<string, string> = {
    'Full-time': 'FULL_TIME',
    'Part-time': 'PART_TIME',
    Contract: 'CONTRACTOR',
    Freelance: 'CONTRACTOR',
    Internship: 'INTERN',
  };
  return jobType ? mapping[jobType] || 'FULL_TIME' : 'FULL_TIME';
}

// Helper function to map experience levels
function mapExperienceLevel(
  level?: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive'
): string {
  const mapping: Record<string, string> = {
    Entry: 'Entry level position requiring 0-2 years of experience',
    Mid: 'Mid-level position requiring 2-5 years of experience',
    Senior: 'Senior position requiring 5-8 years of experience',
    Lead: 'Lead position requiring 8+ years of experience',
    Executive: 'Executive position requiring 10+ years of experience',
  };
  return level ? mapping[level] || level : 'Experience required';
}

// Helper function to map work modes
function mapWorkMode(workMode?: 'Remote' | 'On-site' | 'Hybrid'): string {
  const mapping: Record<string, string> = {
    Remote: 'TELECOMMUTE',
    'On-site': '',
    Hybrid: 'TELECOMMUTE',
  };
  return workMode ? mapping[workMode] || '' : '';
}
