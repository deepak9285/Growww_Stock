import React, { useState } from 'react';
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
  TouchableOpacity
} from 'react-native';
import { colors, spacing } from '../theme';
import { useWatchlists } from '../store/watchlists';

type Props = {
  visible: boolean;
  onClose: () => void;
  symbol: string;
};

export default function WatchlistModal({ visible, setSlider, onClose, symbol }: Props) {
  const { lists, createList, addSymbol } = useWatchlists();
  const [newListName, setNewListName] = useState('');

  const handleCreate = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
    }
  };

  const handleSelectList = (id: string) => {
    addSymbol(id, symbol);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add to Watchlist</Text>
            <TouchableOpacity onPress={()=>setSlider(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
            <View style={styles.createRow}>
              <TextInput
                placeholder="New watchlist name"
                placeholderTextColor={colors.subtext}
                value={newListName}
                onChangeText={setNewListName}
                style={styles.input}
              />
              <Pressable onPress={handleCreate} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>

            {/* Existing watchlists */}
            {lists.length > 0 ? (
              <FlatList
                data={lists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectList(item.id)}
                    style={styles.listItem}
                  >
                    <Text style={styles.listItemText}>{item.name}</Text>
                  </Pressable>
                )}
              />
            ) : (
              <Text style={styles.emptyText}>
                No watchlists yet. Create one above.
              </Text>
            )}

            {/* Close button */}
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.3)', // less opacity than before
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff', // solid modal background
    padding: spacing.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
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
    color: colors.text,
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
  listItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemText: {
    color: colors.text,
    fontSize: 16,
  },
  emptyText: {
    color: colors.subtext,
  },
  cancelButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: colors.subtext,
  },
});
