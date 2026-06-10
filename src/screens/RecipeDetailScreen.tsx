import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet, 
  SafeAreaView, 
  Linking,
  Dimensions
} from 'react-native';
import { 
  ChevronLeft, 
  Heart, 
  Clock, 
  Users, 
  PlayCircle, 
  Plus, 
  CheckCircle2 
} from 'lucide-react-native';
import { mealApi } from '../api/mealdb';
import { Meal } from '../types';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { useGroceryStore } from '../stores/useGroceryStore';

interface RecipeDetailScreenProps {
  recipeId: string;
  onBack: () => void;
}

const { width, height } = Dimensions.get('window');

export default function RecipeDetailScreen({ recipeId, onBack }: RecipeDetailScreenProps) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');

  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { addMultipleItems } = useGroceryStore();

  const favorited = meal ? isFavorite(meal.idMeal) : false;
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (recipeId) {
      mealApi.getMealById(recipeId).then((data) => {
        setMeal(data);
        setLoading(false);
      });
    }
  }, [recipeId]);

  const handleFavorite = () => {
    if (!meal) return;
    if (favorited) removeFavorite(meal.idMeal);
    else addFavorite(meal);
  };

  const handleAddIngredientsToGrocery = () => {
    if (!meal) return;
    const groceryItems = meal.ingredients.map(ing => ({
      name: ing.name,
      quantity: ing.measure,
      source: meal.strMeal
    }));
    addMultipleItems(groceryItems);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 2000);
  };

  const handleOpenYoutube = () => {
    if (meal?.strYoutube) {
      Linking.openURL(meal.strYoutube);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5C542" />
      </View>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Recipe not found</Text>
        <TouchableOpacity onPress={onBack} style={styles.notFoundButton}>
          <Text style={styles.notFoundButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Calculate difficulty
  const isHard = meal.ingredients.length > 10;
  const isMedium = meal.ingredients.length > 5;
  const difficultyLabel = isHard ? 'Hard' : isMedium ? 'Medium' : 'Easy';
  const difficultyColor = isHard ? '#FB7185' : isMedium ? '#F59E0B' : '#10B981';
  const difficultyBg = isHard ? 'rgba(251, 113, 133, 0.1)' : isMedium ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Header Banner */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.heroImage} />
          <View style={styles.linearGradientOverlay} />

          {/* Nav Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.iconButton}>
              <ChevronLeft size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavorite} activeOpacity={0.7} style={styles.iconButton}>
              <Heart size={20} color={favorited ? '#F5C542' : '#FFFFFF'} fill={favorited ? '#F5C542' : 'transparent'} />
            </TouchableOpacity>
          </View>

          {/* Title Overlay */}
          <View style={styles.titleOverlay}>
            <View style={styles.badgesRow}>
              {meal.strCategory ? (
                <View style={styles.categoryBadge}>
                  <Text style={styles.badgeText}>{meal.strCategory}</Text>
                </View>
              ) : null}
              {meal.strArea ? (
                <View style={[styles.categoryBadge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>{meal.strArea}</Text>
                </View>
              ) : null}
              <View style={[styles.categoryBadge, { backgroundColor: difficultyBg, borderColor: difficultyColor, borderWidth: 1 }]}>
                <Text style={[styles.badgeText, { color: difficultyColor }]}>{difficultyLabel}</Text>
              </View>
            </View>

            <Text style={styles.mealTitle}>{meal.strMeal}</Text>
          </View>
        </View>

        {/* Quick Info Stats */}
        <View style={styles.quickStatsRow}>
          <View style={styles.statCell}>
            <Clock size={16} color="#F5C542" />
            <Text style={styles.statLabel}>Prep Time</Text>
            <Text style={styles.statValue}>{10 + (meal.ingredients.length * 3) % 25}m</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCell}>
            <Users size={16} color="#F5C542" />
            <Text style={styles.statLabel}>Yield</Text>
            <Text style={styles.statValue}>4p</Text>
          </View>
          {meal.strYoutube ? (
            <>
              <View style={styles.statDivider} />
              <TouchableOpacity onPress={handleOpenYoutube} activeOpacity={0.7} style={styles.statCell}>
                <PlayCircle size={16} color="#F5C542" />
                <Text style={styles.statLabel}>Visual</Text>
                <Text style={[styles.statValue, { textDecorationLine: 'underline' }]}>Guide</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>

        {/* Tabs Selectors */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('ingredients')} 
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'ingredients' && styles.tabButtonActive]}
          >
            <Text style={[styles.tabButtonText, activeTab === 'ingredients' && styles.tabButtonTextActive]}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('instructions')} 
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'instructions' && styles.tabButtonActive]}
          >
            <Text style={[styles.tabButtonText, activeTab === 'instructions' && styles.tabButtonTextActive]}>
              Instructions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Tab Body content */}
        <View style={styles.tabBodyContent}>
          {activeTab === 'ingredients' ? (
            <View>
              <View style={styles.bodySubHeader}>
                <Text style={styles.subHeaderTitle}>Market List</Text>
                <Text style={styles.subHeaderCount}>{meal.ingredients.length} items</Text>
              </View>

              <View style={styles.ingredientsList}>
                {meal.ingredients.map((ing, i) => (
                  <View key={i} style={styles.ingredientRow}>
                    <View style={styles.dotIndicator} />
                    <View style={styles.ingredientMeta}>
                      <Text style={styles.ingredientName}>{ing.name}</Text>
                      <Text style={styles.ingredientMeasure}>{ing.measure}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                onPress={handleAddIngredientsToGrocery}
                disabled={addedFeedback}
                activeOpacity={0.8}
                style={[
                  styles.deduceButton,
                  addedFeedback && styles.deduceButtonFeedback
                ]}
              >
                {addedFeedback ? (
                  <>
                    <CheckCircle2 size={16} color="#10B981" />
                    <Text style={styles.deduceButtonTextFeedback}>Ingredients Added!</Text>
                  </>
                ) : (
                  <>
                    <Plus size={16} color="#F5C542" />
                    <Text style={styles.deduceButtonText}>Deduce to Grocery List</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.subHeaderTitle}>The Method</Text>

              <View style={styles.instructionsTimeline}>
                {meal.strInstructions
                  .split('\r\n')
                  .filter(s => s.trim())
                  .map((step, i) => (
                    <View key={i} style={styles.timelineRow}>
                      <Text style={styles.timelineNumber}>
                        {String(i + 1).padStart(2, '0')}
                      </Text>
                      <Text style={styles.timelineText}>{step}</Text>
                    </View>
                  ))}
              </View>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  notFoundText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  notFoundButton: {
    backgroundColor: '#F5C542',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  notFoundButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  heroContainer: {
    width: width,
    height: 420,
    position: 'relative',
    backgroundColor: '#0A0A0A',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.55,
  },
  linearGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.4)', // simulate gradient using dim overlay
  },
  topControls: {
    position: 'absolute',
    top: 24,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    zIndex: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F5C542',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#000000',
  },
  mealTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    lineHeight: 38,
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 24,
    paddingVertical: 18,
  },
  statCell: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.3)',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 24,
    marginTop: 24,
  },
  tabButton: {
    paddingBottom: 12,
    position: 'relative',
  },
  tabButtonActive: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5C542',
  },
  tabButtonText: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.4)',
  },
  tabButtonTextActive: {
    color: '#F5C542',
  },
  tabBodyContent: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  bodySubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  subHeaderTitle: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#FFFFFF',
    fontWeight: '300',
  },
  subHeaderCount: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '700',
    marginBottom: 2,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F5C542',
  },
  ingredientMeta: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ingredientMeasure: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'rgba(255, 255, 255, 0.3)',
    marginTop: 2,
  },
  deduceButton: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  deduceButtonFeedback: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderColor: 'rgba(16, 185, 129, 0.15)',
  },
  deduceButtonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  deduceButtonTextFeedback: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  instructionsTimeline: {
    marginTop: 20,
    gap: 24,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineNumber: {
    fontSize: 24,
    fontStyle: 'italic',
    color: 'rgba(245, 197, 66, 0.15)',
    fontWeight: '300',
    minWidth: 32,
  },
  timelineText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '300',
  },
});
