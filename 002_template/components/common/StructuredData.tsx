import React from 'react';

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Component to inject JSON-LD structured data into the page
 */
export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : [data]),
      }}
    />
  );
};
