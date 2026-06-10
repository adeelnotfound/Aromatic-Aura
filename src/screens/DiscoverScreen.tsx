import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useRecipeStore } from '../stores/useRecipeStore';
import RecipeCard from '../components/RecipeCard';

interface DiscoverScreenProps {
  onNavigateToRecipe: (id: string) => void;
}

interface DiscoverHeaderProps {
  query: string;
  setQuery: (q: string) => void;
  handleSearch: () => void;
  categories: any[];
  selectedCategory: string | null;
  handleCategorySelect: (category: string) => void;
  isLoading: boolean;
}

function DiscoverHeader({
  query,
  setQuery,
  handleSearch,
  categories,
  selectedCategory,
  handleCategorySelect,
  isLoading,
}: DiscoverHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.serifTitle}>
          Aromatic <Text style={styles.italicGold}>Aura</Text>
        </Text>
        <Text style={styles.taglineText}>We put the secret in the sauce</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color="rgba(255, 255, 255, 0.4)" style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholder="Search ingredients..."
          placeholderTextColor="rgba(255, 255, 255, 0.2)"
          style={styles.searchInput}
        />
        <TouchableOpacity 
          onPress={handleSearch}
          activeOpacity={0.8}
          style={styles.exploreButton}
        >
          <Text style={styles.exploreButtonText}>Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
          style={styles.categoriesScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.strCategory;
            return (
              <TouchableOpacity
                key={cat.idCategory}
                onPress={() => handleCategorySelect(cat.strCategory)}
                activeOpacity={0.7}
                style={[
                  styles.categoryCapsule,
                  isSelected && styles.categoryCapsuleSelected
                ]}
              >
                <Text style={[
                  styles.categoryCapsuleText,
                  isSelected && styles.categoryCapsuleTextSelected
                ]}>
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsHeaderText}>
          {query ? `Search: ${query}` : selectedCategory ? selectedCategory : 'Popular'}
        </Text>
        {isLoading && <ActivityIndicator color="#F5C542" size="small" />}
      </View>
    </View>
  );
}

export default function DiscoverScreen({ onNavigateToRecipe }: DiscoverScreenProps) {
  const { 
    trending, 
    searchResults, 
    categories, 
    isLoading, 
    search, 
    fetchCategories, 
    fetchTrending, 
    filterByCategory 
  } = useRecipeStore();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchTrending();
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      // Clear filters and show popular
    } else {
      setSelectedCategory(category);
      filterByCategory(category);
    }
  };

  const meals = query || selectedCategory ? searchResults : trending;

  // Footer/Empty indicators for FlatList
  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Search size={28} color="rgba(255, 255, 255, 0.2)" />
        </View>
        <Text style={styles.emptyText}>No masterpieces found yet.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={
          <DiscoverHeader
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
            isLoading={isLoading}
          />
        }
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
    marginBottom: 20,
  },
  titleWrapper: {
    marginTop: 15,
    marginBottom: 20,
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
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    height: 54,
    paddingLeft: 16,
    paddingRight: 6,
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '300',
    height: '100%',
  },
  exploreButton: {
    backgroundColor: '#F5C542',
    borderRadius: 24,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  exploreButtonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#F5C542',
    fontWeight: 'bold',
  },
  categoriesScroll: {
    marginHorizontal: -20,
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryCapsule: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryCapsuleSelected: {
    backgroundColor: '#F5C542',
    borderColor: '#F5C542',
  },
  categoryCapsuleText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  categoryCapsuleTextSelected: {
    color: '#000000',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 10,
    marginBottom: 16,
  },
  resultsHeaderText: {
    fontSize: 22,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  emptyContainer: {
    paddingVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
});
