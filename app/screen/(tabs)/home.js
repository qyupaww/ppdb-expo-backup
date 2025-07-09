import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS, SIZES, CommonStyles } from "@/components/style";
import { router } from "expo-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getSchools } from "@/api/school";

const categories = ["Semua", "SD", "SMP", "SMA"];

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await getSchools();
        setSchools(response.data);
        setFilteredSchools(response.data);
      } catch (error) {
        setSchools([]);
        setFilteredSchools([]);
      }
    };
    fetchSchools();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    filterSchools(text, selectedCategory);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    filterSchools(search, category);
  };

  const filterSchools = (searchText, category) => {
    let filtered = schools.filter((school) =>
      school.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (category !== "Semua") {
      filtered = filtered.filter((school) => school.school_type_id === category);
    }

    setFilteredSchools(filtered);
  };

  return (
    <ProtectedRoute>
      <View style={CommonStyles.container}>
        <Text
          style={{
            fontSize: SIZES.h2,
            color: COLORS.primary,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: SIZES.base * 2,
          }}
        >
          Daftar Sekolah
        </Text>

        <TextInput
          style={[
            CommonStyles.textInput,
            {
              marginHorizontal: SIZES.base * 2,
              borderColor: COLORS.primary,
              borderWidth: 1,
            },
          ]}
          placeholder="Cari sekolah..."
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={handleSearch}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: SIZES.base,
          }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={{
                backgroundColor:
                  selectedCategory === category ? COLORS.primary : COLORS.gray2,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: SIZES.radius,
                marginHorizontal: 5,
              }}
              onPress={() => handleFilter(category)}
            >
              <Text
                style={{
                  color:
                    selectedCategory === category ? COLORS.white : COLORS.black,
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredSchools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[CommonStyles.card, CommonStyles.shadow]}>
              <Text style={{ fontSize: SIZES.h3, color: COLORS.black }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: SIZES.body4, color: COLORS.gray }}>
                {item.address}
              </Text>

              {/* Tombol Lihat */}
              <TouchableOpacity
                style={[
                  CommonStyles.button,
                  {
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    marginTop: SIZES.base,
                  },
                ]}
              >
                <Text style={{ color: COLORS.primary, fontSize: SIZES.body3 }}>
                  Lihat
                </Text>
              </TouchableOpacity>

              {/* Tombol Daftar */}
              <TouchableOpacity
                style={[
                  CommonStyles.button,
                  {
                    backgroundColor: COLORS.primary,
                    marginTop: SIZES.base,
                  },
                ]}
                onPress={() => {
                  router.push({
                    pathname: "/screen/@form/biodata",
                    params: {
                      schoolId: item.id,
                      resetKey: Date.now().toString(),
                    },
                  });
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: SIZES.body3 }}>
                  Daftar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ProtectedRoute>
  );
};

export default HomeScreen;
