'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { teamMembers } from '@/data/team';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920"
            alt="Smash & Stack kitchen"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 to-near-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-white mb-6 drop-shadow-2xl">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Born from a passion for the perfect burger, Smash & Stack is where culinary excellence meets casual comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg text-near-black mb-6">
                From Passion to Perfection
              </h2>
              <div className="space-y-4 text-charcoal/80 text-lg">
                <p>
                  It all started in 2018 when two food lovers, Marcus and Sarah, discovered a shared obsession: the perfect smash burger. After countless experiments in Marcus's backyard and Sarah's tireless recipe refinement, they knew they had something special.
                </p>
                <p>
                  What began as a weekend pop-up quickly grew into a phenomenon. Lines formed around the block. People traveled from neighboring cities. The secret? Never cutting corners. Fresh, locally-sourced ingredients. Perfectly caramelized crusts. Pillowy potato buns. Every detail matters.
                </p>
                <p>
                  Today, Smash & Stack has three locations across Portland, but our mission remains unchanged: serve the best damn burger you've ever tasted, with ingredients we're proud of and hospitality that feels like home.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                alt="Our kitchen in action"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Promise Section */}
      <section className="section-spacing bg-parchment">
        <div className="max-w-container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-near-black mb-4">
              Our Quality Promise
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              We're committed to serving food we're proud of, made with ingredients that meet our exacting standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quality Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card hoverable padding="lg" className="h-full text-center">
                <div className="w-16 h-16 bg-ketchup/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-ketchup"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display uppercase mb-3 text-near-black">
                  Fresh Ingredients
                </h3>
                <p className="text-charcoal/70">
                  Our beef is never frozen and delivered fresh daily. Produce is sourced from local farms within 50 miles.
                </p>
              </Card>
            </motion.div>

            {/* Quality Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card hoverable padding="lg" className="h-full text-center">
                <div className="w-16 h-16 bg-ketchup/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-ketchup"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display uppercase mb-3 text-near-black">
                  Local Sourcing
                </h3>
                <p className="text-charcoal/70">
                  Supporting Oregon ranchers and farmers is our priority. We know exactly where every ingredient comes from.
                </p>
              </Card>
            </motion.div>

            {/* Quality Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card hoverable padding="lg" className="h-full text-center">
                <div className="w-16 h-16 bg-ketchup/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-ketchup"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display uppercase mb-3 text-near-black">
                  No Shortcuts
                </h3>
                <p className="text-charcoal/70">
                  Every patty is hand-formed and smashed to order. Our buns are baked fresh daily. Zero compromises.
                </p>
              </Card>
            </motion.div>

            {/* Quality Pillar 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card hoverable padding="lg" className="h-full text-center">
                <div className="w-16 h-16 bg-ketchup/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-ketchup"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display uppercase mb-3 text-near-black">
                  Fair Wages
                </h3>
                <p className="text-charcoal/70">
                  Great food comes from happy people. Our team earns living wages with benefits and profit sharing.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-near-black mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              The passionate people behind every perfectly smashed patty and hand-cut fry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card hoverable padding="none" className="h-full overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display uppercase mb-1 text-near-black">
                      {member.name}
                    </h3>
                    <p className="text-sm text-ketchup font-medium mb-3 uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-sm text-charcoal/70 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-near-black text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Visit one of our locations and taste why Portland chose us as the best burger in the city three years running.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/locations"
                className="inline-block bg-ketchup text-white font-medium px-8 py-4 rounded-button hover:bg-ketchup-dark transition-all duration-200"
              >
                Find a Location
              </a>
              <a
                href="/order"
                className="inline-block bg-mustard text-near-black font-medium px-8 py-4 rounded-button hover:bg-opacity-90 transition-all duration-200"
              >
                Order Online
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
