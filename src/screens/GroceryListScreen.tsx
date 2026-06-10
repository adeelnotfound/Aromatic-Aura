import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { ShoppingBasket, Plus, Trash2, Check, Sparkles } from 'lucide-react-native';
import { useGroceryStore } from '../stores/useGroceryStore';

export default function GroceryListScreen() {
  const { items, addItem, removeItem, toggleItem, clearChecked, toggleAll, clearAll } = useGroceryStore();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName, newItemQty || '1 unit');
      setNewItemName('');
      setNewItemQty('');
    }
  };

  const checkedItems = items.filter(i => i.checked).length;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.serifTitle}>
            Provision <Text style={styles.italicGold}>List</Text>
          </Text>
          <Text style={styles.taglineText}>Acquire essential ingredients</Text>
        </View>
        <View style={styles.completionContainer}>
          <Text style={styles.pctLabel}>Completion</Text>
          <Text style={styles.completionCount}>
            {checkedItems}<Text style={styles.completionTotal}>/{items.length}</Text>
          </Text>
        </View>
      </View>

      {/* Quick Add Form */}
      <View style={styles.cardForm}>
        <View style={styles.formInputsRow}>
          <TextInput
            value={newItemName}
            onChangeText={setNewItemName}
            placeholder="Ingredient name..."
            placeholderTextColor="rgba(255, 255, 255, 0.2)"
            style={styles.nameInput}
          />
          <TextInput
            value={newItemQty}
            onChangeText={setNewItemQty}
            placeholder="Qty"
            placeholderTextColor="rgba(255, 255, 255, 0.2)"
            style={styles.qtyInput}
            textAlign="center"
          />
        </View>
        <TouchableOpacity
          onPress={handleAddItem}
          disabled={!newItemName.trim()}
          activeOpacity={0.8}
          style={[styles.registerButton, !newItemName.trim() && styles.registerButtonDisabled]}
        >
          <Plus size={16} color={newItemName.trim() ? '#F5C542' : 'rgba(255, 255, 255, 0.2)'} />
          <Text style={[styles.registerButtonText, !newItemName.trim() && styles.registerButtonTextDisabled]}>
            Register Item
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Header/Actions */}
      {items.length > 0 ? (
        <View style={styles.actionsBar}>
          <TouchableOpacity
            onPress={() => {
              const allChecked = items.every(i => i.checked);
              toggleAll(!allChecked);
            }}
            activeOpacity={0.7}
            style={styles.selectAllBtn}
          >
            <View style={[
              styles.miniCheckbox,
              items.every(i => i.checked) && styles.miniCheckboxChecked
            ]}>
              <Check size={8} color="#000000" />
            </View>
            <Text style={styles.actionBtnText}>Select All</Text>
          </TouchableOpacity>

          <View style={styles.rightActions}>
            {checkedItems > 0 ? (
              <TouchableOpacity
                onPress={clearChecked}
                activeOpacity={0.7}
                style={styles.purgeBtn}
              >
                <Trash2 size={12} color="#F5C542" />
                <Text style={styles.purgeText}>Purge ({checkedItems})</Text>
              </TouchableOpacity>
            ) : null}

            {checkedItems > 0 && <Text style={styles.divider}>|</Text>}

            {showConfirmClear ? (
              <View style={styles.confirmBox}>
                <TouchableOpacity 
                  onPress={() => {
                    clearAll();
                    setShowConfirmClear(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.confirmClearText}>Clear!</Text>
                </TouchableOpacity>
                <Text style={styles.confirmSlash}>/</Text>
                <TouchableOpacity 
                  onPress={() => setShowConfirmClear(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.confirmCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowConfirmClear(true)}
                activeOpacity={0.7}
                style={styles.clearAllBtn}
              >
                <Trash2 size={12} color="rgba(255, 255, 255, 0.3)" />
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );

  const renderFooter = () => {
    if (items.length === 0) return null;
    return (
      <View style={styles.tipCard}>
        <View style={styles.tipIconWrapper}>
          <Sparkles size={16} color="#000000" />
        </View>
        <View style={styles.tipTextContainer}>
          <Text style={styles.tipHeader}>Procurance Tip</Text>
          <Text style={styles.tipBody}>
            Elements are organized by their original discovery source. Review your plan before checkout to ensure no component is overlooked.
          </Text>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <ShoppingBasket size={36} color="#FFFFFF" />
      </View>
      <View style={styles.emptyTextWrapper}>
        <Text style={styles.emptyTitle}>Your Basket is Empty</Text>
        <Text style={styles.emptyDescription}>
          Select provisions from your <Text style={styles.goldHighlight}>planned recipes</Text> or add custom elements.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => {
            const isChecked = item.checked;
            return (
              <View style={[styles.itemCard, isChecked && styles.itemCardChecked]}>
                {/* Custom Checkbox */}
                <TouchableOpacity
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.8}
                  style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                >
                  <Check size={14} color="#000000" />
                </TouchableOpacity>

                {/* Info */}
                <TouchableOpacity
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={1}
                  style={styles.itemInfo}
                >
                  <Text style={[styles.itemName, isChecked && styles.itemNameChecked]}>
                    {item.name}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.itemQty}>{item.quantity}</Text>
                    {item.source ? (
                      <>
                        <Text style={styles.dot}>•</Text>
                        <Text numberOfLines={1} style={styles.itemSource}>{item.source}</Text>
                      </>
                    ) : null}
                  </View>
                </TouchableOpacity>

                {/* Delete cross */}
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  activeOpacity={0.7}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={16} color="rgba(255, 255, 255, 0.2)" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </KeyboardAvoidingView>
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
    paddingBottom: 110,
  },
  headerContainer: {
    marginTop: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    marginTop: 4,
  },
  completionContainer: {
    alignItems: 'flex-end',
  },
  pctLabel: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '900',
    marginBottom: 2,
  },
  completionCount: {
    fontSize: 24,
    fontWeight: '300',
    color: '#F5C542',
    fontStyle: 'italic',
  },
  completionTotal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'normal',
  },
  cardForm: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  formInputsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  nameInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  qtyInput: {
    width: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  registerButtonDisabled: {
    opacity: 0.3,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  registerButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingBottom: 12,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  selectAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniCheckbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  miniCheckboxChecked: {
    backgroundColor: '#F5C542',
    borderColor: '#F5C542',
  },
  actionBtnText: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  purgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  purgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#F5C542',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.1)',
    fontSize: 12,
  },
  clearAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearAllText: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  confirmBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confirmClearText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FB7185',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  confirmSlash: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 10,
    marginHorizontal: 6,
  },
  confirmCancelText: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  itemCardChecked: {
    opacity: 0.35,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#F5C542',
    borderColor: '#F5C542',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.90)',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  itemQty: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  dot: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.1)',
  },
  itemSource: {
    fontSize: 10,
    fontStyle: 'italic',
    color: 'rgba(245, 197, 66, 0.5)',
    flex: 1,
  },
  deleteBtn: {
    padding: 8,
  },
  tipCard: {
    backgroundColor: '#1E1E1E',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  tipIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5C542',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTextContainer: {
    flex: 1,
  },
  tipHeader: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  tipBody: {
    fontSize: 10,
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '300',
  },
  emptyContainer: {
    paddingVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    opacity: 0.4,
  },
  emptyTextWrapper: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  emptyDescription: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.2)',
    maxWidth: 220,
    textAlign: 'center',
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  goldHighlight: {
    color: 'rgba(245, 197, 66, 0.6)',
  },
});
