import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ChefCard } from '@/components/features/ChefCard';
import { getAllChefs } from '@/data/chefs';
import { generateOrganizationSchema } from '@/utils/seo';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us | Golden Wok',
  description: 'Learn about Golden Wok\'s history, culinary philosophy, and our team of expert chefs bringing authentic Chinese cuisine to San Francisco for over 30 years.',
  openGraph: {
    title: 'About Golden Wok',
    description: 'Over 30 years of authentic Chinese cuisine excellence',
    images: ['/og-about.jpg'],
    type: 'website',
  },
};

export default function AboutPage() {
  const chefs = getAllChefs();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <Container>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Our Story</h1>
            <p className={styles.heroSubtitle}>
              Three decades of culinary excellence and authentic Chinese flavors
            </p>
          </div>
        </Container>
      </section>

      {/* Brand Story Section */}
      <section className={styles.storySection}>
        <Container>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Golden Wok Restaurant"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.storyContent}>
              <h2 className={styles.sectionTitle}>A Journey of Flavors</h2>
              <p className={styles.text}>
                Golden Wok was founded in 1993 by Master Chef Zhang Wei, who brought his extensive
                culinary training from Sichuan province to San Francisco. With over 30 years of
                experience in traditional Chinese cooking, Chef Zhang envisioned a restaurant that
                would honor authentic flavors while embracing modern culinary innovation.
              </p>
              <p className={styles.text}>
                What started as a small family restaurant has grown into a beloved culinary
                destination, known for our commitment to quality, authenticity, and exceptional
                service. Every dish we serve reflects our dedication to preserving traditional
                techniques while adapting to contemporary tastes.
              </p>
              <p className={styles.text}>
                Today, Golden Wok operates three locations across San Francisco, each maintaining
                the same high standards and attention to detail that have defined us from the
                beginning. Our success is built on the foundation of fresh ingredients, masterful
                preparation, and a genuine passion for sharing Chinese culinary traditions.
              </p>
              <p className={styles.text}>
                We source our ingredients daily from local markets and specialty suppliers, ensuring
                that every dish meets our exacting standards. From our signature Sichuan specialties
                to classic Cantonese favorites, each recipe has been perfected over years of
                dedication and love for the craft.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Culinary Philosophy Section */}
      <section className={styles.philosophySection}>
        <Container>
          <h2 className={styles.sectionTitle}>Our Culinary Philosophy</h2>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🎯</div>
              <h3 className={styles.philosophyTitle}>Quality First</h3>
              <p className={styles.philosophyText}>
                We never compromise on ingredients. Every component is carefully selected for
                freshness, flavor, and authenticity. From premium cuts of meat to the finest
                spices imported directly from China, quality is our promise.
              </p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>🏛️</div>
              <h3 className={styles.philosophyTitle}>Authentic Tradition</h3>
              <p className={styles.philosophyText}>
                Our recipes honor centuries-old Chinese culinary traditions. We use time-tested
                techniques passed down through generations, ensuring that every dish captures the
                true essence of regional Chinese cuisine.
              </p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>💡</div>
              <h3 className={styles.philosophyTitle}>Modern Innovation</h3>
              <p className={styles.philosophyText}>
                While respecting tradition, we embrace innovation. Our chefs continuously explore
                new presentations and flavor combinations, creating dishes that are both familiar
                and excitingly fresh.
              </p>
            </div>
            <div className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>❤️</div>
              <h3 className={styles.philosophyTitle}>Heartfelt Service</h3>
              <p className={styles.philosophyText}>
                Every guest is treated like family. Our team is dedicated to creating memorable
                dining experiences, from the moment you enter until your final bite. Your
                satisfaction is our greatest reward.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chefs Section */}
      <section className={styles.chefsSection}>
        <Container>
          <div className={styles.chefsHeader}>
            <h2 className={styles.sectionTitle}>Meet Our Culinary Team</h2>
            <p className={styles.sectionDescription}>
              Our talented chefs bring decades of combined experience and a shared passion for
              authentic Chinese cuisine
            </p>
          </div>
          <div className={styles.chefsGrid}>
            {chefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
        </Container>
      </section>

      {/* Awards Section */}
      <section className={styles.awardsSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Recognition & Awards</h2>
          <div className={styles.awardsGrid}>
            <div className={styles.awardCard}>
              <div className={styles.awardYear}>2023</div>
              <h3 className={styles.awardTitle}>Best Chinese Restaurant</h3>
              <p className={styles.awardOrg}>San Francisco Chronicle</p>
            </div>
            <div className={styles.awardCard}>
              <div className={styles.awardYear}>2022</div>
              <h3 className={styles.awardTitle}>Michelin Bib Gourmand</h3>
              <p className={styles.awardOrg}>Michelin Guide</p>
            </div>
            <div className={styles.awardCard}>
              <div className={styles.awardYear}>2021</div>
              <h3 className={styles.awardTitle}>Diner&apos;s Choice Award</h3>
              <p className={styles.awardOrg}>OpenTable</p>
            </div>
            <div className={styles.awardCard}>
              <div className={styles.awardYear}>2020</div>
              <h3 className={styles.awardTitle}>Best Authentic Cuisine</h3>
              <p className={styles.awardOrg}>SF Food Critics Association</p>
            </div>
            <div className={styles.awardCard}>
              <div className={styles.awardYear}>2019</div>
              <h3 className={styles.awardTitle}>Top 10 Asian Restaurants</h3>
              <p className={styles.awardOrg}>Bay Area Dining Guide</p>
            </div>
            <div className={styles.awardCard}>
              <div className={styles.awardYear}>2018</div>
              <h3 className={styles.awardTitle}>Excellence in Service</h3>
              <p className={styles.awardOrg}>California Restaurant Association</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valuesList}>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>01</div>
              <div className={styles.valueContent}>
                <h3 className={styles.valueTitle}>Excellence in Every Detail</h3>
                <p className={styles.valueText}>
                  From ingredient selection to final presentation, we pursue perfection in every
                  aspect of our craft.
                </p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>02</div>
              <div className={styles.valueContent}>
                <h3 className={styles.valueTitle}>Respect for Tradition</h3>
                <p className={styles.valueText}>
                  We honor the rich culinary heritage of China while making it accessible and
                  enjoyable for all.
                </p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>03</div>
              <div className={styles.valueContent}>
                <h3 className={styles.valueTitle}>Community Connection</h3>
                <p className={styles.valueText}>
                  We&apos;re proud to be part of the San Francisco community, supporting local suppliers
                  and giving back through various initiatives.
                </p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>04</div>
              <div className={styles.valueContent}>
                <h3 className={styles.valueTitle}>Sustainability Focus</h3>
                <p className={styles.valueText}>
                  We&apos;re committed to sustainable practices, from sourcing to waste management,
                  ensuring a better future for generations to come.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
