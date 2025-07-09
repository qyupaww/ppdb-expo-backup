import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES, CommonStyles } from "./style";

const CommonDropdown = ({ label, options, value, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  const handleSelect = (val) => {
    setVisible(false);
    onSelect(val);
  };

  return (
    <View style={{ marginBottom: SIZES.base }}>
      {/* Trigger Button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[CommonStyles.textInput, { justifyContent: "center" }]}
      >
        <Text
          style={{
            fontFamily: "Lexend-Deca-Regular",
            fontSize: SIZES.body4,
            color: value === 0 ? COLORS.gray : COLORS.black,
          }}
        >
          {selected?.label || label}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalBox}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontFamily: "Lexend-Deca-Regular",
    fontSize: SIZES.body4,
    color: COLORS.black,
  },
});

export default CommonDropdown;
