import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Meal } from '../types';
import { useFavoritesStore } from '../stores/useFavoritesStore';

interface RecipeCardProps {
  meal: Meal;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // two-column layout

export default function RecipeCard({ meal, onPress }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(meal.idMeal);

  const handleFavorite = () => {
    if (favorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        
        <TouchableOpacity
          onPress={handleFavorite}
          activeOpacity={0.7}
          style={styles.favoriteButton}
        >
          <Heart
            size={16}
            color={favorited ? '#F5C542' : '#FFFFFF'}
            fill={favorited ? '#F5C542' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        {meal.strCategory ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{meal.strCategory}</Text>
          </View>
        ) : null}
        <Text numberOfLines={2} style={styles.titleText}>
          {meal.strMeal}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    position: 'relative',
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  infoContainer: {
    padding: 12,
  },
  categoryBadge: {
    backgroundColor: '#F5C542',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 18,
  },
});
