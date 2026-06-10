import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Heart, Search, ChevronRight } from 'lucide-react-native';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import RecipeCard from '../components/RecipeCard';

interface FavoritesScreenProps {
  onNavigateToRecipe: (id: string) => void;
  onNavigateToDiscover: () => void;
}

const { width } = Dimensions.get('window');

export default function FavoritesScreen({ onNavigateToRecipe, onNavigateToDiscover }: FavoritesScreenProps) {
  const { favorites } = useFavoritesStore();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.serifTitle}>
        Private <Text style={styles.italicGold}>Collection</Text>
      </Text>
      <Text style={styles.taglineText}>Your curated gastronomic archives</Text>
    </View>
  );

  const renderFooter = () => {
    if (favorites.length === 0) return null;
    return (
      <View style={styles.bannerContainer}>
        <View style={styles.bannerTextWrapper}>
          <Text style={styles.bannerHeader}>Seeking Inspiration?</Text>
          <Text style={styles.bannerSub}>Acquire new discoveries</Text>
        </View>
        <TouchableOpacity 
          onPress={onNavigateToDiscover}
          activeOpacity={0.8}
          style={styles.bannerButton}
        >
          <Search size={14} color="#000000" />
          <Text style={styles.bannerButtonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircleWrapper}>
        <View style={styles.emptyIconCircle}>
          <Heart size={44} color="rgba(255, 255, 255, 0.1)" />
        </View>
        <View style={styles.glowingBackground} />
      </View>

      <View style={styles.emptyTextWrapper}>
        <Text style={styles.emptyTitle}>The Archives are Empty</Text>
        <Text style={styles.emptyDescription}>
          Preserve the masterpieces you encounter during your search.
        </Text>
      </View>

      <TouchableOpacity 
        onPress={onNavigateToDiscover}
        activeOpacity={0.8}
        style={styles.searchButton}
      >
        <Text style={styles.searchButtonText}>Commence Search</Text>
        <ChevronRight size={14} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <RecipeCard 
            meal={item} 
            onPress={() => onNavigateToRecipe(item.idMeal)} 
          />
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  flatListContent: {
    padding: 20,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 24,
  },
  serifTitle: {
    fontSize: 34,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  italicGold: {
    color: '#F5C542',
    fontStyle: 'italic',
  },
  taglineText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '700',
    marginTop: 5,
  },
  bannerContainer: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextWrapper: {
    flex: 1,
    marginRight: 15,
  },
  bannerHeader: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  bannerButton: {
    backgroundColor: '#F5C542',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerButtonText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconCircleWrapper: {
    position: 'relative',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  glowingBackground: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(245, 197, 66, 0.08)', // F5C542 glowing tint
    zIndex: 1,
  },
  emptyTextWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.2)',
    maxWidth: 200,
    textAlign: 'center',
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
