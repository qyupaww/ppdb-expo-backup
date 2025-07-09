import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { COLORS, CommonStyles } from '@/components/style';

export default function PaperDropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  error,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? '';

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
        <TextInput
          mode="outlined"
          label={label}
          placeholder={placeholder}
          value={selectedLabel}
          editable={false}
          right={<TextInput.Icon disabled icon="menu-down" />}
          error={!!error}
          style={CommonStyles.paperInput}
          outlineColor={COLORS.gray2}
          activeOutlineColor={COLORS.primary}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                  style={styles.item}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000044',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 10,
    maxHeight: 300,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.black,
  },
});
