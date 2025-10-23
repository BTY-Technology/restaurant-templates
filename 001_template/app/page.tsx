import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DishCard } from "@/components/features/DishCard";
import { NewsletterForm } from "@/components/features/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { getFeaturedDishes } from "@/data/dishes";
import { getMainLocation } from "@/data/locations";
import { generateRestaurantSchema } from "@/utils/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Golden Wok | Authentic Chinese Cuisine with Modern Flair",
  description:
    "Experience the finest Chinese cuisine in San Francisco. From traditional Sichuan dishes to modern interpretations, Golden Wok brings authentic flavors with exceptional quality.",
  keywords: [
    "Chinese restaurant",
    "Sichuan cuisine",
    "San Francisco dining",
    "authentic Chinese food",
    "dim sum",
  ],
  openGraph: {
    title: "Golden Wok | Authentic Chinese Cuisine",
    description: "Experience the finest Chinese cuisine in San Francisco",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export default function HomePage() {
  const featuredDishes = getFeaturedDishes();
  const mainLocation = getMainLocation();
  const restaurantSchema = generateRestaurantSchema(mainLocation);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Container>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Authentic Chinese Cuisine
                <span className={styles.heroSubtitle}>with Modern Flair</span>
              </h1>
              <p className={styles.heroDescription}>
                Experience the perfect blend of traditional flavors and
                contemporary culinary artistry. From our family to yours, we
                bring you the taste of authentic Chinese cuisine.
              </p>
              <div className={styles.heroActions}>
                <Link href="/menu">
                  <Button size="md" variant="primary">
                    Order Now
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="sm" variant="outline">
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className={styles.featuredSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Dishes</h2>
            <p className={styles.sectionDescription}>
              Discover our most popular and beloved creations, crafted with care
              by our expert chefs
            </p>
          </div>
          <div className={styles.dishGrid}>
            {featuredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
          <div className={styles.viewAllContainer}>
            <Link href="/menu">
              <Button variant="outline">View Full Menu</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* About Preview Section */}
      <section className={styles.aboutPreview}>
        <Container>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Golden Wok Restaurant Interior"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.aboutContent}>
              <h2 className={styles.aboutTitle}>Our Story</h2>
              <p className={styles.aboutText}>
                For over three decades, Golden Wok has been a cornerstone of
                authentic Chinese cuisine in San Francisco. Founded by Master
                Chef Zhang Wei, our restaurant combines time-honored traditional
                techniques with innovative culinary approaches.
              </p>
              <p className={styles.aboutText}>
                Every dish tells a story of heritage, passion, and dedication to
                excellence. We source the finest ingredients and prepare each
                meal with the same care and attention that has made us a beloved
                destination for food enthusiasts.
              </p>
              <Link href="/about">
                <Button variant="outline">Learn More About Us</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <Container>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Stay Connected</h2>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter for exclusive offers, new menu items,
              and culinary insights
            </p>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
