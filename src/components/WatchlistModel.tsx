// import React, { useContext, useState } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity
// } from 'react-native';
// import { colors, spacing } from '../theme';
// import { useWatchlists } from '../store/watchlists';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import { ThemeContext } from '../contexts/themeContext';

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   symbol: string;
// };

// export default function WatchlistModal({ visible, setInWatchlist,setSlider, onClose, symbol }: Props) {
//   const { lists, createList, addSymbol } = useWatchlists();
//   const [newListName, setNewListName] = useState('');
//   const {theme} =useContext(ThemeContext);
//   const handleCreate = () => {
//     if (newListName.trim()) {
//       createList(newListName.trim());
//       setNewListName('');
//     }
//   };

//   const handleSelectList = (id: string) => {
//     addSymbol(id, symbol);
//     setInWatchlist(true);
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <View style={styles.overlay}>
//           <View style={[styles.modalContent,{backgroundColor:theme.background}]}>

//             <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

//             <Text style={[styles.title,{color:theme.text}]}>Add to Watchlist</Text>
//             <TouchableOpacity onPress={()=>setSlider(false)}>
//               <MaterialIcons name="close" size={24} color={theme.text} />
             
//             </TouchableOpacity>
//              </View>
//             <View style={styles.createRow}>
//               <TextInput
//                 placeholder="New watchlist name"
//                 placeholderTextColor={colors.subtext}
//                 value={newListName}
//                 onChangeText={setNewListName}
//                 style={[styles.input,{color:theme.text}]}

//               />
//               <Pressable onPress={handleCreate} style={styles.addButton}>
//                 <Text style={styles.addButtonText}>Add</Text>
//               </Pressable>
//             </View>
//             {lists.length > 0 ? (
//               <FlatList
//                 data={lists}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                   <Pressable
//                     onPress={() => handleSelectList(item.id)}
//                     style={styles.listItem}
//                   >
//                     <Text style={[styles.listItemText,{color:theme.text}]}>{item.name}</Text>

//                   </Pressable>
//                 )}
//               />
//             ) : (
//               <Text style={styles.emptyText}>
//                 No watchlists yet. Create one above.
//               </Text>
//             )}

//             <Pressable onPress={onClose} style={[styles.cancelButton,{backgroundColor:theme.danger}]}>

//               <Text style={styles.cancelText}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }
// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)', // less opacity than before
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//      // solid modal background
//     padding: spacing.lg,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     maxHeight: '70%',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: spacing.md,
//   },
//   createRow: {
//     flexDirection: 'row',
//     marginBottom: spacing.md,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 8,
//     paddingHorizontal: spacing.sm,
    
//   },
//   addButton: {
//     marginLeft: spacing.sm,
//     backgroundColor: colors.success,
//     paddingHorizontal: spacing.md,
//     justifyContent: 'center',
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   listItem: {
//     paddingVertical: spacing.sm,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   listItemText: {
//     color: colors.text,
//     fontSize: 16,
//   },
//   emptyText: {
//     color: colors.subtext,
//   },
//   cancelButton: {
//     marginTop: spacing.md,
//     paddingVertical: spacing.sm,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelText: {
//     color: colors.text,
//   },
// });
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