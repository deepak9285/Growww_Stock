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
} from 'react-native';
import { colors, spacing } from '../theme';
import { useWatchlists } from '../store/watchlists';

type Props = {
  visible: boolean;
  onClose: () => void;
  symbol: string;
};

export default function WatchlistModal({ visible, onClose, symbol }: Props) {
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
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              padding: spacing.lg,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: '70%',
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: '700',
                marginBottom: spacing.md,
              }}
            >
              Add to Watchlist
            </Text>

            {/* Create new watchlist */}
            <View style={{ flexDirection: 'row', marginBottom: spacing.md }}>
              <TextInput
                placeholder="New watchlist name"
                placeholderTextColor={colors.subtext}
                value={newListName}
                onChangeText={setNewListName}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: spacing.sm,
                  color: colors.text,
                }}
              />
              <Pressable
                onPress={handleCreate}
                style={{
                  marginLeft: spacing.sm,
                  backgroundColor: colors.success,
                  paddingHorizontal: spacing.md,
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Add</Text>
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
                    style={{
                      paddingVertical: spacing.sm,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ color: colors.text, fontSize: 16 }}>
                      {item.name}
                    </Text>
                  </Pressable>
                )}
              />
            ) : (
              <Text style={{ color: colors.subtext }}>
                No watchlists yet. Create one above.
              </Text>
            )}

            {/* Close button */}
            <Pressable
              onPress={onClose}
              style={{
                marginTop: spacing.md,
                paddingVertical: spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.subtext }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
