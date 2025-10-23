'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Chef } from '@/types/chef';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './ChefCard.module.css';

export interface ChefCardProps {
  chef: Chef;
  /**
   * Maximum length of bio text before showing "read more"
   * @default 150
   */
  bioMaxLength?: number;
}

/**
 * ChefCard component displays chef profile information including image,
 * name, title, bio, specialties, and years of experience.
 */
export const ChefCard: React.FC<ChefCardProps> = ({
  chef,
  bioMaxLength = 150,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = chef.bio.length > bioMaxLength;
  const displayBio = shouldTruncate && !isExpanded
    ? `${chef.bio.substring(0, bioMaxLength)}...`
    : chef.bio;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={styles.chefCard} padding="none" hoverable>
      <div className={styles.imageContainer}>
        <Image
          src={chef.image}
          alt={`${chef.name} - ${chef.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <CardHeader className={styles.header}>
          <div className={styles.titleGroup}>
            <CardTitle className={styles.name}>{chef.name}</CardTitle>
            <p className={styles.nameZh}>{chef.nameZh}</p>
          </div>
          <p className={styles.title}>{chef.title}</p>
        </CardHeader>

        <div className={styles.bio}>
          <p className={styles.bioText}>{displayBio}</p>
          {shouldTruncate && (
            <button
              className={styles.readMoreButton}
              onClick={toggleExpanded}
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isExpanded ? styles.rotated : ''}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.details}>
          {/* Specialties */}
          {chef.specialties && chef.specialties.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Specialties</h4>
              <div className={styles.specialties}>
                {chef.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="primary"
                    size="sm"
                    outline
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {chef.experience && (
            <div className={styles.section}>
              <div className={styles.experience}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.experienceIcon}
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className={styles.experienceText}>{chef.experience}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
