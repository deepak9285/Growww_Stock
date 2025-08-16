
import React, { useContext, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { colors, spacing } from '../theme';
import { useWatchlists } from '../store/watchlists';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { ThemeContext } from '../contexts/themeContext';

type Props = {
  visible: boolean;
  onClose: () => void;
  symbol: string;
  setInWatchlist: (value: boolean) => void;
  setSlider: (value: boolean) => void;
};

export default function WatchlistModal({ visible, setInWatchlist, setSlider, onClose, symbol }: Props) {
  const { lists, createList, addSymbol } = useWatchlists();
  const [newListName, setNewListName] = useState('');
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const { theme } = useContext(ThemeContext);

  const handleCreate = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
    }
  };

  const handleCheckboxToggle = (listId: string) => {
    setSelectedLists(prev => {
      if (prev.includes(listId)) {
        return prev.filter(id => id !== listId);
      } else {
        return [...prev, listId];
      }
    });
  };
  const handleSave = () => {
    if (selectedLists.length === 0) {
      Alert.alert('No Selection', 'Please select at least one watchlist to add the symbol.');
      return;
    }
    selectedLists.forEach(listId => {
      addSymbol(listId, symbol);
    });
    const listNames = lists
      .filter(list => selectedLists.includes(list.id))
      .map(list => list.name)
      .join(', ');

    Alert.alert(
      'Success!',
      `${symbol} has been added to: ${listNames}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setInWatchlist(true);
            setSelectedLists([]);
            onClose();
          }
        }
      ]
    );
  };

  const handleClose = () => {
    setSelectedLists([]);
    setSlider(false);
    onClose();
  };

  const renderCheckbox = (isChecked: boolean) => (
    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
      {isChecked && (
        <MaterialIcons name="check" size={16} color="#fff" />
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.overlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.text }]}>Add to Watchlist</Text>
              <TouchableOpacity onPress={handleClose}>
                <MaterialIcons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.createRow}>
              <TextInput
                placeholder="New watchlist name"
                placeholderTextColor={colors.subtext}
                value={newListName}
                onChangeText={setNewListName}
                style={[styles.input, { color: theme.text }]}
              />
              <Pressable onPress={handleCreate} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>

            {lists.length > 0 ? (
              <>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Select Watchlists:
                </Text>
                <FlatList
                  data={lists}
                  keyExtractor={(item) => item.id}
                  style={styles.listContainer}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleCheckboxToggle(item.id)}
                      style={styles.listItem}
                    >
                      {renderCheckbox(selectedLists.includes(item.id))}
                      <Text style={[styles.listItemText, { color: theme.text }]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />

                <View style={styles.buttonRow}>
                  <Pressable 
                    onPress={handleSave} 
                    style={[styles.saveButton, { opacity: selectedLists.length > 0 ? 1 : 0.5 }]}
                    disabled={selectedLists.length === 0}
                  >
                    <Text style={styles.saveButtonText}>
                      Save ({selectedLists.length} selected)
                    </Text>
                  </Pressable>

                  <Pressable onPress={handleClose} style={[styles.cancelButton, { backgroundColor: theme.danger }]}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.emptyText, { color: theme.text }]}>
                  No watchlists yet. Create one above.
                </Text>
                <Pressable onPress={handleClose} style={[styles.cancelButton, { backgroundColor: theme.danger }]}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: spacing.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  createRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  addButton: {
    marginLeft: spacing.sm,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  listContainer: {
    maxHeight: 200,
    marginBottom: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
  },
  emptyText: {
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.success,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});