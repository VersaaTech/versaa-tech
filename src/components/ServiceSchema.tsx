import { JsonLd } from './JsonLd';
import { generateServiceSchema, BASE_URL } from '@/lib/schema';

interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
  serviceType: string;
  areaServed?: string[];
}

export function ServiceSchema({
  name,
  description,
  slug,
  serviceType,
  areaServed,
}: ServiceSchemaProps) {
  const schema = generateServiceSchema({
    name,
    description,
    url: `${BASE_URL}/${slug}`,
    serviceType,
    areaServed,
  });

  return <JsonLd data={schema} />;
}
