import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#083D77",
  secondary: "#0F4C81",
  success: "#34C759",
  warning: "#F5FF30",
  danger: "#FF3B30",
  info: "#FF9500",
  black: "#0C0C0C",
  black2: "#343434",
  white: "#FFFFFF",
  gray: "#8E8E93",
  gray2: "#DFDFDF",
  background: "#F2F2F7",
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  width,
  height,
};

export const FONTS = {
  h1: { fontFamily: 'Lexend-Deca-Bold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Lexend-Deca-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Lexend-Deca-Bold', fontSize: SIZES.h3, lineHeight: 26 },
  h4: { fontFamily: 'Lexend-Deca-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: 'Lexend-Deca-Bold', fontSize: SIZES.h5, lineHeight: 20 },
  body1: { fontFamily: 'Lexend-Deca-Regular', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'Lexend-Deca-Regular', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'Lexend-Deca-Regular', fontSize: SIZES.body3, lineHeight: 24 },
  body4: { fontFamily: 'Lexend-Deca-Regular', fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontFamily: 'Lexend-Deca-Regular', fontSize: SIZES.body5, lineHeight: 20 },
};

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flexCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    height: 45,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontFamily: 'Lexend-Deca-Regular',
    fontSize: SIZES.body4,
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    padding: SIZES.base * 2,
    marginVertical: 8,
  },
  inputRadio: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SIZES.base,
    paddingVertical: SIZES.base,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  labelInput: {
    ...FONTS.body3,
    color: COLORS.black,
    marginBottom: SIZES.base / 2,
  },

  // New Paper Component Styles
  paperTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: SIZES.base,
    textAlign: "center",
  },
  paperContainer: {
    width: "100%",
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  paperInput: {
    fontFamily: 'Lexend-Deca-Regular',
    fontSize: SIZES.body4,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base,
  },
  paperButton: {
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    borderRadius: SIZES.radius,
  },
  paperButtonLabel: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  progressContainer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  stepText: {
    ...FONTS.body4,
    marginBottom: SIZES.base,
    color: COLORS.black2,
  },
  errorText: {
    color: COLORS.danger,
    ...FONTS.body5,
    marginBottom: SIZES.base,
  },
  dropdown: {
    fontFamily: 'Lexend-Deca-Regular',
    fontSize: SIZES.body4,
    height: 55,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    paddingHorizontal: SIZES.base * 2,
    justifyContent: "center",
    marginVertical: 8,
  },
  dropdownPlaceholder: {
    fontFamily: 'Lexend-Deca-Regular',
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
  dropdownSelected: {
    fontFamily: 'Lexend-Deca-Regular',
    fontSize: SIZES.body4,
    color: COLORS.black,
  },
  dropdownItem: {
    fontFamily: 'Lexend-Deca-Regular',
    fontSize: SIZES.body4,
    color: COLORS.black,
  },
});

export default {
  COLORS,
  SIZES,
  FONTS,
  CommonStyles,
};
