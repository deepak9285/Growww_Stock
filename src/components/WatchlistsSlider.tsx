// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Animated
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WatchlistSlider = ({ isVisible, product, setStatus, onWatchlistUpdate, onClose }) => {
//   const [watchlists, setWatchlists] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newWatchlistName, setNewWatchlistName] = useState('');
//   const slide = useRef(new Animated.Value(300)).current;

//   useEffect(() => {
//     if (isVisible) {
//       fetchWatchlists();
//       slideUp();
//     }
//   }, [isVisible]);

//   const fetchWatchlists = async () => {
//     try {
//       setLoading(true);
//       const storedWatchlists = await AsyncStorage.getItem('watchlists');
//       if (storedWatchlists) {
//         setWatchlists(JSON.parse(storedWatchlists));
//       } else {
//         setWatchlists([]);
//       }
//     } catch (error) {
//       console.error('Error fetching watchlists:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveWatchlists = async (updatedWatchlists) => {
//     try {
//       await AsyncStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
//       setWatchlists(updatedWatchlists);
//       onWatchlistUpdate && onWatchlistUpdate(updatedWatchlists);
//     } catch (error) {
//       console.error('Error saving watchlists:', error);
//     }
//   };

//   const handleToggle = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const createWatchlist = async (name, productId) => {
//     const newWatchlist = {
//       id: Date.now(),
//       name: name.trim(),
//       products: [productId],
//       createdAt: new Date().toISOString()
//     };

//     const updatedWatchlists = [...watchlists, newWatchlist];
//     await saveWatchlists(updatedWatchlists);
//     return newWatchlist.id;
//   };

//   const addToWatchlist = async (productId, watchlistIds) => {
//     const updatedWatchlists = watchlists.map((watchlist) => {
//       if (watchlistIds.includes(watchlist.id)) {
//         if (!watchlist.products.includes(productId)) {
//           return {
//             ...watchlist,
//             products: [...watchlist.products, productId]
//           };
//         }
//       }
//       return watchlist;
//     });

//     await saveWatchlists(updatedWatchlists);
//   };

//   const slideUp = () => {
//     Animated.timing(slide, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true
//     }).start();
//   };

//   const slideDown = () => {
//     Animated.timing(slide, {
//       toValue: 300,
//       duration: 300,
//       useNativeDriver: true
//     }).start();
//   };

//   const closeModal = () => {
//     slideDown();
//     setTimeout(() => {
//       onClose && onClose();
//     }, 300);
//   };

//   const handleSave = async () => {
//     if (selected.length > 0) {
//       await addToWatchlist(product.id, selected);
//     }
//     if (newWatchlistName.trim() !== '') {
//       await createWatchlist(newWatchlistName.trim(), product.id);
//     }
//     setNewWatchlistName('');
//     setSelected([]);
//     setStatus(false);
//   };

//   const handleCreateAndClose = async () => {
//     if (newWatchlistName.trim()) {
//       await createWatchlist(newWatchlistName.trim(), product.id);
//       setNewWatchlistName('');
//       setStatus(false);
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent
//       visible={isVisible}
//       onRequestClose={() => setStatus(false)}
//     >
//       <View style={styles.modalBackdrop}>
//         <Animated.View style={[styles.modalContent, { transform: [{ translateY: slide }] }]}>
//           <Text style={styles.modalTitle}>Add {product.name} to...</Text>

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.textInput}
//               placeholder="New Watchlist Name"
//               placeholderTextColor="#9ca3af"
//               value={newWatchlistName}
//               onChangeText={setNewWatchlistName}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={handleCreateAndClose}>
//               <Text style={styles.primaryButtonText}>Add</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={{ maxHeight: 200 }}>
//             {watchlists.map((w) => (
//               <TouchableOpacity
//                 key={w.id}
//                 style={
//                   selected.includes(w.id)
//                     ? styles.checklistItemActive
//                     : styles.checklistItem
//                 }
//                 onPress={() => handleToggle(w.id)}
//               >
//                 <View
//                   style={
//                     selected.includes(w.id) ? styles.checkboxActive : styles.checkbox
//                   }
//                 >
//                   {selected.includes(w.id) && (
//                     <Text style={styles.checkmark}>✓</Text>
//                   )}
//                 </View>
//                 <Text style={styles.checklistItemText}>{w.name}</Text>
//                 {w.products.includes(product.id) && (
//                   <Text style={styles.alreadyInText}>(Already in)</Text>
//                 )}
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           <TouchableOpacity
//             style={[styles.primaryButton, { backgroundColor: '#10B981', marginTop: 24 }]}
//             onPress={handleSave}
//           >
//             <Text style={styles.primaryButtonText}>Save</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackdrop: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.6)'
//   },
//   modalContent: {
//     backgroundColor: '#1F2937',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 24
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginBottom: 16
//   },
//   inputContainer: { flexDirection: 'row', marginBottom: 16 },
//   textInput: {
//     flex: 1,
//     backgroundColor: '#374151',
//     color: '#FFF',
//     padding: 12,
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8
//   },
//   addButton: {
//     backgroundColor: '#6366F1',
//     padding: 12,
//     borderTopRightRadius: 8,
//     borderBottomRightRadius: 8,
//     justifyContent: 'center'
//   },
//   checklistItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: '#374151',
//     borderRadius: 8,
//     marginBottom: 8
//   },
//   checklistItemActive: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: '#6366F1',
//     borderRadius: 8,
//     marginBottom: 8
//   },
//   checklistItemText: { color: '#FFF', marginLeft: 12 },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 4,
//     borderWidth: 2,
//     borderColor: '#6B7280',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   checkboxActive: {
//     width: 24,
//     height: 24,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//     borderColor: '#818CF8',
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   checkmark: { color: '#FFF', fontWeight: 'bold' },
//   alreadyInText: { color: '#9CA3AF', fontSize: 12, marginLeft: 'auto' },
//   primaryButton: {
//     backgroundColor: '#6366F1',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center'
//   },
//   primaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
// });

// export default WatchlistSlider;
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistSlider = ({ isVisible, product, setStatus, onWatchlistUpdate, onClose }) => {
  const [watchlists, setWatchlists] = useState({});
  const [selected, setSelected] = useState([]);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const slide = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isVisible) {
      fetchWatchlists();
      slideUp();
    }
  }, [isVisible]);

  // Load watchlists from AsyncStorage
  const fetchWatchlists = async () => {
    try {
      const storedWatchlists = await AsyncStorage.getItem('watchlists');
      setWatchlists(storedWatchlists ? JSON.parse(storedWatchlists) : {});
    } catch (error) {
      console.error('Error fetching watchlists:', error);
    }
  };

  // Save watchlists to AsyncStorage
  const saveWatchlists = async (updatedWatchlists) => {
    try {
      await AsyncStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
      setWatchlists(updatedWatchlists);
      onWatchlistUpdate && onWatchlistUpdate(updatedWatchlists);
    } catch (error) {
      console.error('Error saving watchlists:', error);
    }
  };

  const handleToggle = (watchlistName) => {
    setSelected((prev) =>
      prev.includes(watchlistName)
        ? prev.filter((name) => name !== watchlistName)
        : [...prev, watchlistName]
    );
  };

  const createWatchlist = async (name, productId) => {
    const updated = { ...watchlists };
    updated[name] = [productId];
    await saveWatchlists(updated);
  };

  const addToWatchlist = async (productId, selectedNames) => {
    const updated = { ...watchlists };
    selectedNames.forEach((name) => {
      if (!updated[name]) updated[name] = [];
      if (!updated[name].includes(productId)) {
        updated[name].push(productId);
      }
    });
    await saveWatchlists(updated);
  };

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleSave = async () => {
    if (selected.length > 0) {
      await addToWatchlist(product.id, selected);
    }
    if (newWatchlistName.trim()) {
      await createWatchlist(newWatchlistName.trim(), product.id);
    }
    setNewWatchlistName('');
    setSelected([]);
    setStatus(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => setStatus(false)}
    >
      <View style={styles.modalBackdrop}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: slide }] }]}>
          <Text style={styles.modalTitle}>Add {product.name} to...</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="New Watchlist Name"
              placeholderTextColor="#9ca3af"
              value={newWatchlistName}
              onChangeText={setNewWatchlistName}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={async () => {
                if (newWatchlistName.trim()) {
                  await createWatchlist(newWatchlistName.trim(), product.id);
                  setNewWatchlistName('');
                  setStatus(false);
                }
              }}
            >
              <Text style={styles.primaryButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: 200 }}>
            {Object.keys(watchlists).map((name) => (
              <TouchableOpacity
                key={name}
                style={
                  selected.includes(name)
                    ? styles.checklistItemActive
                    : styles.checklistItem
                }
                onPress={() => handleToggle(name)}
              >
                <View
                  style={
                    selected.includes(name) ? styles.checkboxActive : styles.checkbox
                  }
                >
                  {selected.includes(name) && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checklistItemText}>{name}</Text>
                {watchlists[name].includes(product.id) && (
                  <Text style={styles.alreadyInText}>(Already in)</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: '#10B981', marginTop: 24 }]}
            onPress={handleSave}
          >
            <Text style={styles.primaryButtonText}>Save</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16
  },
  inputContainer: { flexDirection: 'row', marginBottom: 16 },
  textInput: {
    flex: 1,
    backgroundColor: '#374151',
    color: '#FFF',
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  addButton: {
    backgroundColor: '#6366F1',
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center'
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#374151',
    borderRadius: 8,
    marginBottom: 8
  },
  checklistItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    marginBottom: 8
  },
  checklistItemText: { color: '#FFF', marginLeft: 12 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxActive: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#6366F1',
    borderColor: '#818CF8',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: { color: '#FFF', fontWeight: 'bold' },
  alreadyInText: { color: '#9CA3AF', fontSize: 12, marginLeft: 'auto' },
  primaryButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default WatchlistSlider;
