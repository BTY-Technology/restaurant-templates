'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { DishCard } from '@/components/features/DishCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { dishes, getDishById, getRelatedDishes } from '@/data/dishes';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatting';
import { Dish } from '@/types/dish';
import styles from './page.module.css';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function DishPage({ params }: PageProps) {
  const dish = getDishById(params.slug);
  const relatedDishes = getRelatedDishes(params.slug);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!dish) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(dish, quantity, specialInstructions);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const getSpiceLevelText = (level: number) => {
    if (level === 0) return 'Not Spicy';
    if (level === 1) return 'Mild';
    if (level === 2) return 'Medium';
    if (level === 3) return 'Hot';
    return 'Extra Hot';
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Menu', url: '/menu' },
    { name: dish.category, url: `/menu?category=${dish.category}` },
    { name: dish.name, url: `/menu/${dish.id}` },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <section className={styles.breadcrumbs}>
        <Container>
          <nav className={styles.breadcrumbNav}>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.url}>
                {index > 0 && <span className={styles.separator}>/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className={styles.currentCrumb}>{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className={styles.crumb}>
                    {crumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Container>
      </section>

      {/* Dish Details */}
      <section className={styles.dishSection}>
        <Container>
          <div className={styles.dishGrid}>
            {/* Image Section */}
            <div className={styles.imageSection}>
              <div className={styles.imageContainer} onClick={() => setShowImageModal(true)}>
                <Image
                  src={dish.images.main}
                  alt={dish.name}
                  width={600}
                  height={400}
                  className={styles.dishImage}
                  priority
                />
                <div className={styles.zoomHint}>Click to zoom</div>
              </div>

              {/* Badges */}
              <div className={styles.badges}>
                {dish.featured && <Badge variant="warning">Featured</Badge>}
                {dish.popular && <Badge variant="primary">Popular</Badge>}
                {dish.vegetarian && <Badge variant="success">Vegetarian</Badge>}
                {dish.vegan && <Badge variant="success">Vegan</Badge>}
                {dish.glutenFree && <Badge variant="info">Gluten-Free</Badge>}
              </div>
            </div>

            {/* Details Section */}
            <div className={styles.detailsSection}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.dishName}>{dish.name}</h1>
                  <p className={styles.dishNameZh}>{dish.nameZh}</p>
                </div>
                <div className={styles.price}>{formatPrice(dish.price)}</div>
              </div>

              <p className={styles.description}>{dish.description}</p>

              {/* Spice Level */}
              {dish.spiceLevel !== undefined && (
                <div className={styles.infoRow}>
                  <span className={styles.label}>Spice Level:</span>
                  <span className={styles.spiceLevel}>
                    {getSpiceLevelText(dish.spiceLevel)}
                    {dish.spiceLevel > 0 && (
                      <span className={styles.peppers}>
                        {' '}
                        {'🌶️'.repeat(dish.spiceLevel)}
                      </span>
                    )}
                  </span>
                </div>
              )}

              {/* Allergens */}
              {dish.allergens && dish.allergens.length > 0 && (
                <div className={styles.infoRow}>
                  <span className={styles.label}>Allergens:</span>
                  <span className={styles.value}>{dish.allergens.join(', ')}</span>
                </div>
              )}

              {/* Ingredients */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Ingredients</h3>
                  <ul className={styles.ingredientsList}>
                    {dish.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition Info */}
              {dish.nutritionInfo && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Nutrition Information</h3>
                  <table className={styles.nutritionTable}>
                    <tbody>
                      <tr>
                        <td>Calories</td>
                        <td>{dish.nutritionInfo.calories}</td>
                      </tr>
                      <tr>
                        <td>Protein</td>
                        <td>{dish.nutritionInfo.protein}g</td>
                      </tr>
                      <tr>
                        <td>Carbohydrates</td>
                        <td>{dish.nutritionInfo.carbs}g</td>
                      </tr>
                      <tr>
                        <td>Fat</td>
                        <td>{dish.nutritionInfo.fat}g</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Special Instructions */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Special Instructions (Optional)</h3>
                <textarea
                  className={styles.textarea}
                  placeholder="Any dietary restrictions or special requests?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Quantity and Add to Cart */}
              <div className={styles.orderSection}>
                <div className={styles.quantitySelector}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={styles.addToCartButton}
                >
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Dishes */}
      {relatedDishes.length > 0 && (
        <section className={styles.relatedSection}>
          <Container>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedDishes.map((relatedDish) => (
                <DishCard key={relatedDish.id} dish={relatedDish} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Image Zoom Modal */}
      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
        <div className={styles.modalContent}>
          <Image
            src={dish.images.main}
            alt={dish.name}
            width={1200}
            height={800}
            className={styles.modalImage}
          />
        </div>
      </Modal>
    </>
  );
}
