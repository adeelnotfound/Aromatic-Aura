import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Home, ShoppingCart, Heart } from 'lucide-react-native';

// Screens
import DiscoverScreen from './screens/DiscoverScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import GroceryListScreen from './screens/GroceryListScreen';
import FavoritesScreen from './screens/FavoritesScreen';

type TabType = 'Discover' | 'Grocery' | 'Favorites';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Discover');
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  // Simple navigation actions
  const navigateToRecipe = (id: string) => {
    setActiveRecipeId(id);
  };

  const handleBack = () => {
    setActiveRecipeId(null);
  };

  const handleNavigateToDiscover = () => {
    setActiveRecipeId(null);
    setActiveTab('Discover');
  };

  // Rendering screen based on state
  const renderContent = () => {
    if (activeRecipeId) {
      return (
        <RecipeDetailScreen 
          recipeId={activeRecipeId} 
          onBack={handleBack} 
        />
      );
    }

    switch (activeTab) {
      case 'Discover':
        return <DiscoverScreen onNavigateToRecipe={navigateToRecipe} />;
      case 'Grocery':
        return <GroceryListScreen />;
      case 'Favorites':
        return (
          <FavoritesScreen 
            onNavigateToRecipe={navigateToRecipe} 
            onNavigateToDiscover={handleNavigateToDiscover} 
          />
        );
      default:
        return <DiscoverScreen onNavigateToRecipe={navigateToRecipe} />;
    }
  };

  const bottomTabs = [
    { name: 'Discover' as TabType, icon: Home, label: 'Discover' },
    { name: 'Grocery' as TabType, icon: ShoppingCart, label: 'Grocery' },
    { name: 'Favorites' as TabType, icon: Heart, label: 'Favorites' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Active Screen Content Area */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Persistent Bottom Bar - hidden during Recipe Detail page for full sensory focus */}
      {!activeRecipeId && (
        <View style={styles.bottomBar}>
          {bottomTabs.map(({ name, icon: Icon, label }) => {
            const isActive = activeTab === name;
            return (
              <TouchableOpacity
                key={name}
                onPress={() => setActiveTab(name)}
                activeOpacity={0.7}
                style={styles.tabButton}
              >
                <Icon 
                  size={20} 
                  color={isActive ? '#F5C542' : 'rgba(255, 255, 255, 0.4)'} 
                  fill={isActive && name === 'Favorites' ? '#F5C542' : 'transparent'}
                />
                <Text style={[
                  styles.tabLabel, 
                  isActive && styles.tabLabelActive
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 12,
    left: 20,
    right: 20,
    height: Platform.OS === 'ios' ? 74 : 64,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
    zIndex: 100,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 4,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  tabLabelActive: {
    color: '#F5C542',
    fontWeight: '800',
  },
});
